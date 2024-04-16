import dotenv from 'dotenv';

export const ReadEnv = () => {
  if (process.env.ENV) {
    dotenv.config({
      path: `../../src/.env.${process.env.ENV}`,
      override: true
    });
  } else throw new Error('Please Provide Test Environment');
};
