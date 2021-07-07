import 'module-alias/register';
import { connect, disconnect } from '@/src/db';
import { CategoryModel } from '@/src/models/Category.models';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(process.cwd(), process.env.NODE_ENV == 'production' ? '.env' : '.env.dev'),
});

(async () => {
  connect();

  const categories = [
    {
      name: '가나다',
      color: 'abcd',
      isExist: true,
    },
    {
      name: '라마바',
      color: 'aced',
      isExist: true,
    },
    {
      name: '사아자',
      color: 'aedg',
      isExist: true,
    },
    {
      name: '차카타',
      color: 'bwgw',
      isExist: true,
    },
    {
      name: '파하거',
      color: 'xxxx',
      isExist: true,
    },
  ];

  try {
    for (const category of categories) {
      await CategoryModel.create(category);
      console.log(category);
    }
    disconnect();
  } catch (e) {
    console.error(e);
  }
})();
