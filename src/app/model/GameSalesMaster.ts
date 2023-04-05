import {GameSalesDetails} from './GameSalesDetails';

export interface GameSalesMaster {
  storeId: number,
  storeName: string,
  openUserId: number,
  openUserName:string,
  closedUserId: number,
  closeUserName:string,
  saleState: string,
  transactionDate: Date,
  salesDetail: GameSalesDetails[]
}