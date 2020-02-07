import React, { Component } from 'react'

import api from '../../services/api';

import './styles.css';

export default class Main extends Component {
    state = {
        products: [],
        productInfo: {}
    }

    componentDidMount() {//é executado assim que o componente for mostrado em tela
        this.loadProducts();
    }

    loadProducts = async () => {
        const response = await api.get('/products');

        this.setState({//seta os valores na variável state no indice dos produtos
            products: response.data.docs
        })

    }

    prevPage = () => {

    }

    nextPage = () => {

    }

    render() {
        const { products } = this.state;
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
                    <button onClick={this.prevPage}>Anterior</button>
                    <button onClick={this.nextPage}>Próximo</button>
                </div>
            </div>
        )
    }
}