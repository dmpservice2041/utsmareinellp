import User from './User';
import Product from './Product';
import ProductImage from './ProductImage';
import Blog from './Blog';
import Message from './Message';
import Media from './Media';
import Tag from './Tag';
import ProductTag from './ProductTag';
import BlogTag from './BlogTag';
import ActivityLog from './ActivityLog';

// Product associations
Product.hasMany(ProductImage, { foreignKey: 'product_id', as: 'images', onDelete: 'CASCADE' });
ProductImage.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });
Product.belongsToMany(Tag, { through: ProductTag, foreignKey: 'product_id', otherKey: 'tag_id', as: 'tags' });
Tag.belongsToMany(Product, { through: ProductTag, foreignKey: 'tag_id', otherKey: 'product_id', as: 'products' });

// Blog associations
Blog.belongsToMany(Tag, { through: BlogTag, foreignKey: 'blog_id', otherKey: 'tag_id', as: 'blogTags' });
Tag.belongsToMany(Blog, { through: BlogTag, foreignKey: 'tag_id', otherKey: 'blog_id', as: 'taggedBlogs' });

// Media associations
Media.belongsTo(User, { foreignKey: 'uploaded_by', as: 'uploader' });
User.hasMany(Media, { foreignKey: 'uploaded_by', as: 'uploadedMedia' });

// ActivityLog associations
ActivityLog.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasMany(ActivityLog, { foreignKey: 'user_id', as: 'activityLogs' });

// Junction table associations
ProductTag.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });
ProductTag.belongsTo(Tag, { foreignKey: 'tag_id', as: 'tag' });
BlogTag.belongsTo(Blog, { foreignKey: 'blog_id', as: 'blog' });
BlogTag.belongsTo(Tag, { foreignKey: 'tag_id', as: 'tag' });

export {
    User,
    Product,
    ProductImage,
    Blog,
    Message,
    Media,
    Tag,
    ProductTag,
    BlogTag,
    ActivityLog,
};
