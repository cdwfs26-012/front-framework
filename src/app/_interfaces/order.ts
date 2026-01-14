import {CartItem, OrderMode} from '../_services/cart';

export interface OrderInterface {
  id: string;
  date: Date;
  items: CartItem[];
  mode: OrderMode;
  total: number;
}
