import { CategorisedSalesDetail } from "./CategorisedSalesDetail";

export interface CategorisedSalesMaster 
{
storeId: number,
storeName: string,
transactionDate: Date,
creditSalesDetail: CategorisedSalesDetail[],
debitSalesDetail: CategorisedSalesDetail[],
}
