import {  Context } from 'telegraf';

export interface CoinalystTelegrafContext extends Context {
  user?: User;
}