import User from './User';
import Product from './Product';
import ProductImage from './ProductImage';
import Blog from './Blog';
import Message from './Message';

// Associations
Product.hasMany(ProductImage, { foreignKey: 'product_id', as: 'images', onDelete: 'CASCADE' });
ProductImage.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

export {
    User,
    Product,
    ProductImage,
    Blog,
    Message,
};
