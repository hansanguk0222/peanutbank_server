import 'module-alias/register';
import { connect, disconnect } from '@/src/db';
import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';

dotenv.config({
  path: path.resolve(process.cwd(), process.env.NODE_ENV == 'production' ? '.env' : '.env.dev'),
});

(async () => {
  const db = connect();

  // const users = [
  //   {
  //     userId: 'github01234545',
  //     OAuthType: 'github',
  //     nickname: 'peanut2016',
  //     image: 'abc',
  //     accountbooks: [],
  //     categories: [
  //       {
  //         name: '식비',
  //         color: '#000',
  //         isExist: true,
  //       },
  //       {
  //         name: '문화생활',
  //         color: '#F00',
  //         isExist: true,
  //       },
  //       {
  //         name: '월급',
  //         color: '#0F0',
  //         isExist: true,
  //       },
  //     ],
  //   },
  // ];

  // const accountbooks = [
  //   {
  //     yyyymm: '2021-06',
  //     yyyymmValue: {
  //       expenditure: [
  //         {
  //           dd: '01',
  //           ddValue: [
  //             {
  //               discription: '국밥',
  //               categoryId: '60e682f3a307e8a5cb221528',
  //               account: 5000,
  //             },
  //           ],
  //         },
  //         {
  //           dd: '15',
  //           ddValue: [
  //             {
  //               discription: '해장국',
  //               categoryId: '60e682f3a307e8a5cb221528',
  //               account: 6000,
  //             },
  //           ],
  //         },
  //         {
  //           dd: '21',
  //           ddValue: [
  //             {
  //               discription: '당구',
  //               categoryId: '60e682f3a307e8a5cb221529',
  //               account: 5000,
  //             },
  //           ],
  //         },
  //       ],
  //       income: [
  //         {
  //           dd: '10',
  //           ddValue: [
  //             {
  //               discription: '6월 월급',
  //               categoryId: '60e682f3a307e8a5cb22152a',
  //               account: 123456789,
  //             },
  //           ],
  //         },
  //       ],
  //       allExpenditure: 16000,
  //       allIncome: 123456789,
  //       maxExpenditure: 6000,
  //       maxIncome: 123456789,
  //     },
  //   },
  // ];

  try {
    // for (const user of users) {
    //   await UserModel.create(user);
    // }
    const categories = await db.UserModel.findCategoriesByUserId('github01234545', 'github');
    console.log(categories);
  } catch (e) {
    console.error(e);
  }
})();
