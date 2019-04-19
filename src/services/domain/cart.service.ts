import { ProdutoDTO } from './../../models/produto.dto';
import { Cart } from './../../models/cart';
import { StorageService } from './../storage.service';
import { Injectable } from "@angular/core";

@Injectable()
export class CartService {

    constructor(public storage: StorageService){

    }

    createOrClearCart(): Cart {
        let cart: Cart = {itens: []};
        this.storage.setCart(cart);
        return cart;
    }

    getCart(): Cart {
        let cart: Cart = this.storage.getCart();
        if (cart == null) {
            cart = this.createOrClearCart();
        }
        return cart;
    }

    addProduto(produto: ProdutoDTO): Cart {
        let cart = this.getCart();
        //achar a posição do item na lista de cart
        let position = cart.itens.findIndex(x => x.produto.id == produto.id/*verificar se existe algum produto com a mesma id*/);
        //se não achar nada, o valor -1 é retornado
        if (position == -1) {
            cart.itens.push({quantidade: 1, produto: produto});
        }
        this.storage.setCart(cart);
        return cart;
    }
}