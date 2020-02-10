import React, { Component } from 'react'

import api from '../../services/api';

import './styles.css';

export default class Main extends Component {
    state = {
        products: [],
        productInfo: {},
        page: 1
    }

    componentDidMount() {//é executado assim que o componente for mostrado em tela
        this.loadProducts();
    }

    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);

        const { docs, ...productInfo } = response.data;

        this.setState({//seta os valores na variável state no indice dos produtos
            products: response.data.docs,
            productInfo,
            page
        })

    }

    prevPage = () => {
        const { page, productInfo } = this.state;

        if (page === 1) return

        const pageNumber = page - 1;

        this.loadProducts(pageNumber);
    }

    nextPage = () => {
        const { page, productInfo } = this.state;

        if (page === productInfo.pages) return;

        const pageNumber = page + 1;

        this.loadProducts(pageNumber);
    }

    render() {
        const { products, page, productInfo } = this.state;
        return (
            <div className="product-list">
                {products.map(product => (
                    /*
                        o react pede para toda vez que usar o map, 
                        q o primeiro elemento que venha logo após o map seja adicionado uma key com um identificador único para cada item da interação
                    */
                    <article key={product._id}>
                        <strong>{product.title}</strong>
                        <p>{product.description}</p>

                        <a href="">Acessar</a>
                    </article>

                ))}

                <div className="actions">
                    <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                    <button disabled={page === productInfo.pages} onClick={this.nextPage}>Próximo</button>
                </div>
            </div>
        )
    }
}