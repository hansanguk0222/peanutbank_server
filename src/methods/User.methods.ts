import { IAccountBook, ICategory, IUserDocument, ILedgerDocument } from '@/src/types';
import mongoose, { Document } from 'mongoose';
import { getNewMaxAmount, getThreeYYYYMM } from '@/src/utils/utilFunc';
export async function updateImage(this: IUserDocument, userId: string, image: string): Promise<string> {
  const filter = { userId };
  const updatedDoc = {
    $set: {
      image,
      updatedAt: new Date(),
    },
  };
  try {
    const result = await this.model('user').updateOne(filter, updatedDoc);
    return 'ok'; //추후 수정
  } catch (err) {
    return err; //추후 수정
  }
}

export async function updateNickname(this: IUserDocument, { nickname }: { nickname: string }): Promise<void> {
  this.nickname = nickname;
  await this.save();
  return;
}

export async function updateCategoryColor(this: IUserDocument, { categoryId, color }: { categoryId: string; color: string }): Promise<void> {
  this.categories.map((item) => {
    if (item._id.toString() === categoryId) {
      item.color = color;
    }
  });
  await this.save();
}

export async function deleteCategory(this: IUserDocument, { categoryId }: { categoryId: string }): Promise<void> {
  this.categories.map((item) => {
    if (item._id.toString() === categoryId) {
      item.isExist = false;
    }
  });
  await this.save();
}

export async function findAccountbookByYYYYMM(this: IUserDocument, { yyyy, mm }: { yyyy: string; mm: string }): Promise<IAccountBook> {
  const [accountbook] = this.accountbooks.filter((item) => item.yyyymm === `${yyyy}-${mm}`);
  return accountbook;
}

export async function findLedgersByYYYYMMDD(this: IUserDocument, { yyyy, mm, dd }: { nickname: string; yyyy: string; mm: string; dd: string }): Promise<ILedgerDocument[]> {
  const [accountbook] = this.accountbooks.filter((item) => item.yyyymm === `${yyyy}-${mm}`);
  if (accountbook) {
    const [expenditure] = accountbook.yyyymmValue.expenditure.filter((ledger) => ledger.dd === dd);
    const [income] = accountbook.yyyymmValue.income.filter((ledger) => ledger.dd === dd);
    const expenditureDDValue = expenditure && expenditure.ddValue && expenditure.ddValue.length !== 0 ? expenditure.ddValue.filter((expenditureItem) => expenditureItem.isExist) : [];
    const incomeDDValue = income && income.ddValue && income.ddValue.length !== 0 ? income.ddValue.filter((incomeItem) => incomeItem.isExist === true) : [];
    return [...expenditureDDValue, ...incomeDDValue];
  }
  return [];
}

export async function createLedger(
  this: IUserDocument,
  { yyyy, mm, dd, incomeOrExpenditure, description, amount, categoryId }: { yyyy: string; mm: string; dd: string; incomeOrExpenditure: string; description: string; amount: number; categoryId: string }
): Promise<mongoose.Types.ObjectId> {
  const _id = mongoose.Types.ObjectId();
  let isExistAccountbook = false;
  this.accountbooks.map((accountbook) => {
    if (accountbook.yyyymm === `${yyyy}-${mm}`) {
      isExistAccountbook = true;
      let isExistDDItem = false;
      accountbook.yyyymmValue[incomeOrExpenditure].map(
        (incomeOrExpenditureItem: { dd: string; ddValue: { _id: mongoose.Types.ObjectId; amount: number; description: string; categoryId: string; isExist: boolean }[] }) => {
          if (incomeOrExpenditureItem.dd == dd) {
            isExistDDItem = true;
            incomeOrExpenditureItem.ddValue.push({ _id, amount, description, categoryId, isExist: true });
          }
        }
      );
      if (!isExistDDItem) {
        accountbook.yyyymmValue[incomeOrExpenditure].push({
          dd,
          ddValue: [{ _id, amount, description, categoryId, isExist: true }],
        });
      }
      if (incomeOrExpenditure === 'income') {
        const [insertDateIncomeLedgers] = accountbook.yyyymmValue.income.filter((ledger) => ledger.dd === dd);
        const newMaxIncome = getNewMaxAmount({ ddValue: insertDateIncomeLedgers.ddValue });
        accountbook.yyyymmValue.allIncome += amount;
        accountbook.yyyymmValue.maxIncome = Math.max(accountbook.yyyymmValue.maxIncome, newMaxIncome);
      } else {
        const [insertDateExpenditureLedgers] = accountbook.yyyymmValue.expenditure.filter((ledger) => ledger.dd === dd);
        const newMaxExpenditure = getNewMaxAmount({ ddValue: insertDateExpenditureLedgers.ddValue });
        accountbook.yyyymmValue.allExpenditure += amount;
        accountbook.yyyymmValue.maxExpenditure = Math.max(accountbook.yyyymmValue.maxExpenditure, newMaxExpenditure);
      }
    }
  });
  if (!isExistAccountbook) {
    const accountbook: IAccountBook = {
      yyyymm: `${yyyy}-${mm}`,
      yyyymmValue: {
        expenditure: [],
        income: [],
        allExpenditure: 0,
        allIncome: 0,
        maxExpenditure: 0,
        maxIncome: 0,
      },
    };
    accountbook.yyyymmValue[incomeOrExpenditure].push({ dd, ddValue: [{ _id, amount, description, categoryId, isExist: true }] });
    if (incomeOrExpenditure === 'income') {
      accountbook.yyyymmValue.allIncome = amount;
      accountbook.yyyymmValue.maxIncome = amount;
    } else {
      accountbook.yyyymmValue.allExpenditure = amount;
      accountbook.yyyymmValue.maxExpenditure = amount;
    }
    this.accountbooks.push(accountbook);
  }
  await this.save();
  return _id;
}

export async function updateLedger(
  this: IUserDocument,
  {
    yyyy,
    mm,
    dd,
    incomeOrExpenditure,
    description,
    amount,
    categoryId,
    ledgerId,
  }: { yyyy: string; mm: string; dd: string; incomeOrExpenditure: string; description: string; amount: number; categoryId: string; ledgerId: string }
): Promise<void> {
  this.accountbooks.map((accountbook) => {
    if (accountbook.yyyymm === `${yyyy}-${mm}`) {
      accountbook.yyyymmValue[incomeOrExpenditure].map(
        (incomeOrExpenditureItem: { dd: string; ddValue: { _id: mongoose.Types.ObjectId; amount: number; description: string; categoryId: string }[] }) => {
          if (incomeOrExpenditureItem.dd == dd) {
            incomeOrExpenditureItem.ddValue.map((ledger) => {
              if (ledger._id.toHexString() === ledgerId) {
                if (incomeOrExpenditure === 'income') {
                  accountbook.yyyymmValue.allIncome = accountbook.yyyymmValue.allIncome - ledger.amount + amount;
                } else {
                  accountbook.yyyymmValue.allExpenditure = accountbook.yyyymmValue.allExpenditure - ledger.amount + amount;
                }
                ledger.amount = amount;
                ledger.description = description;
                ledger.categoryId = categoryId;
              }
            });
          }
        }
      );
      if (incomeOrExpenditure === 'income') {
        accountbook.yyyymmValue.maxIncome = 0;
        accountbook.yyyymmValue.income.map((ledger) => {
          const newMaxIncome = getNewMaxAmount({ ddValue: ledger.ddValue });
          accountbook.yyyymmValue.maxIncome = Math.max(accountbook.yyyymmValue.maxIncome, newMaxIncome);
        });
      } else {
        accountbook.yyyymmValue.maxExpenditure = 0;
        accountbook.yyyymmValue.expenditure.map((ledger) => {
          const newMaxExpenditure = getNewMaxAmount({ ddValue: ledger.ddValue });
          accountbook.yyyymmValue.maxExpenditure = Math.max(accountbook.yyyymmValue.maxExpenditure, newMaxExpenditure);
        });
      }
    }
  });
  await this.save();
}

export async function createCategory(this: IUserDocument, { name, color }: { name: string; color: string }): Promise<mongoose.Types.ObjectId> {
  const _id = mongoose.Types.ObjectId();
  const [isExistCategory] = this.categories.filter((category) => category.name === name);
  console.log(isExistCategory);
  if (!isExistCategory) {
    const newCategory = { _id, name, color, isExist: true } as ICategory;
    this.categories.push(newCategory);
    await this.save();
    return _id;
  }
  return isExistCategory._id;
}

export async function deleteLedger(this: IUserDocument, { ledgerId, yyyy, mm, dd }: { ledgerId: string; yyyy: string; mm: string; dd: string }): Promise<void> {
  this.accountbooks.map((accountbook) => {
    if (accountbook.yyyymm === `${yyyy}-${mm}`) {
      accountbook.yyyymmValue.expenditure.map((ledgers) => {
        if (ledgers.dd === dd) {
          ledgers.ddValue.map((ledger) => {
            if (ledger._id.toHexString() === ledgerId) {
              ledger.isExist = false;
            }
          });
        }
      });
    }
  });
  await this.save();
}
