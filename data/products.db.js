const { log } = require('console');
const fs = require('fs');

class Product {
    constructor(path) {
        this.path = path;
        this.products = [];
        this.idCounter = 0;
    }
    async addProduct(
		title,
		description,
		code,
		price,
		status,
		stock,
		category,
		thumbnails
	) {
        try {
            if (!title || !description|| !code || !price || !status || !stock || !category)
                throw Error('Todos los campos son obligatorios');
            let products = await fs.promises.readFile(this.path, { encoding: 'utf8' });
            products = JSON.parse(products);
            if (products.some(e => e.code === code)) throw Error('El valor de code debe ser único');
            const product = {
                title,
				description,
				code,
				price,
				status,
				stock,
				category,
				thumbnails,
                id: (products.length + 1).toString()
            }
			products.push(product)
            const productsJSON = JSON.stringify(products, null, 2);
            await fs.promises.writeFile(this.path, productsJSON, { encoding: 'utf8' });
            return product;
        } catch (error) {
			if (error.message.includes('no such file or directory')) {
				const product = {
					title,
					description,
					code,
					price,
					status,
					stock,
					category,
					thumbnails,
					id: (this.products.length + 1).toString()
				}
                const productsJSON = JSON.stringify(
                    [
                        product
                    ],
                    null,
                    2
                );
                await fs.promises.writeFile(this.path, productsJSON, { encoding: 'utf8' });
                return product;
            } else {
                console.log(error.message);
            }
        }
    }
    async getProducts() {
        try {
            let products = await fs.promises.readFile(this.path, { encoding: 'utf8' });
            products = JSON.parse(products);
            return products;
        } catch (error) {
            if (error.message.includes('no such file or directory')) {
                const productsJSON = JSON.stringify(this.products, null, 2);
                await fs.promises.writeFile(this.path, productsJSON, { encoding: 'utf8' });
                return this.products;
            } else {
                console.log(error);
            }
        }
    }
    async getProductById(id) {
        try {
            let products = await fs.promises.readFile(this.path, { encoding: 'utf8' });
            products = JSON.parse(products);
            const product = products.find(e => e.id === id);
            if (product) return product;
            // else return `Error, el producto con id ${id} no se ha encontrado`
            else return 'Not found';
        } catch (error) {
            if (error.message.includes('no such file or directory')) {
                const productsJSON = JSON.stringify(this.products, null, 2);
                await fs.promises.writeFile(this.path, productsJSON, { encoding: 'utf8' });
                return this.products;
            } else {
                console.log(error);
            }
        }
    }
    async updateProduct(id, object) {
        try {
            let products = await fs.promises.readFile(this.path, { encoding: 'utf8' });
            products = JSON.parse(products);
            let index;
            const product = products.find((e, i) => {
                if (e.id === id) {
                    index = i;
                    return true;
                }
            });
            if (!product) return 'Not found';
            for (const key in object) {
                if (Object.hasOwnProperty.call(product, key) && key !== 'id') {
                    if (key !== 'code') product[key] = object[key];
                    else {
						if (products.some((e, i) => e.code === object[key] && i !== index))
                            return 'El valor de code debe ser único';
                    }
                }
            }
            products[index] = product;
            const productsJSON = JSON.stringify(products, null, 2);
            await fs.promises.writeFile(this.path, productsJSON, { encoding: 'utf8' });
            return product;
        } catch (error) {
            if (error.message.includes('no such file or directory')) {
                const productsJSON = JSON.stringify(this.products, null, 2);
                await fs.promises.writeFile(this.path, productsJSON, { encoding: 'utf8' });
                return this.products;
            } else {
                console.log(error);
            }
        }
    }
    async deleteProduct(id) {
        try {
            let products = await fs.promises.readFile(this.path, { encoding: 'utf8' });
            products = JSON.parse(products);
            let index;
            const product = products.find((e, i) => {
                if (e.id === id) {
                    index = i;
                    return true;
                }
            });
            if (!product) return 'Not found';
            const deleted = products.splice(index, 1)[0];
            const productsJSON = JSON.stringify(products, null, 2);
            await fs.promises.writeFile(this.path, productsJSON, { encoding: 'utf8' });
            return deleted;
        } catch (error) {
            if (error.message.includes('no such file or directory')) {
                const productsJSON = JSON.stringify(this.products, null, 2);
                await fs.promises.writeFile(this.path, productsJSON, { encoding: 'utf8' });
                return this.products;
            } else {
                console.log(error);
            }
        }
    }
}

const product = new Product('./src/db/products.json');
module.exports = product