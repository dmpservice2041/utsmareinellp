"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityLog = exports.BlogTag = exports.ProductTag = exports.Tag = exports.Media = exports.Message = exports.Blog = exports.ProductImage = exports.Product = exports.User = void 0;
const User_1 = __importDefault(require("./User"));
exports.User = User_1.default;
const Product_1 = __importDefault(require("./Product"));
exports.Product = Product_1.default;
const ProductImage_1 = __importDefault(require("./ProductImage"));
exports.ProductImage = ProductImage_1.default;
const Blog_1 = __importDefault(require("./Blog"));
exports.Blog = Blog_1.default;
const Message_1 = __importDefault(require("./Message"));
exports.Message = Message_1.default;
const Media_1 = __importDefault(require("./Media"));
exports.Media = Media_1.default;
const Tag_1 = __importDefault(require("./Tag"));
exports.Tag = Tag_1.default;
const ProductTag_1 = __importDefault(require("./ProductTag"));
exports.ProductTag = ProductTag_1.default;
const BlogTag_1 = __importDefault(require("./BlogTag"));
exports.BlogTag = BlogTag_1.default;
const ActivityLog_1 = __importDefault(require("./ActivityLog"));
exports.ActivityLog = ActivityLog_1.default;
// Product associations
Product_1.default.hasMany(ProductImage_1.default, { foreignKey: 'product_id', as: 'images', onDelete: 'CASCADE' });
ProductImage_1.default.belongsTo(Product_1.default, { foreignKey: 'product_id', as: 'product' });
Product_1.default.belongsToMany(Tag_1.default, { through: ProductTag_1.default, foreignKey: 'product_id', otherKey: 'tag_id', as: 'tags' });
Tag_1.default.belongsToMany(Product_1.default, { through: ProductTag_1.default, foreignKey: 'tag_id', otherKey: 'product_id', as: 'products' });
// Blog associations
Blog_1.default.belongsToMany(Tag_1.default, { through: BlogTag_1.default, foreignKey: 'blog_id', otherKey: 'tag_id', as: 'blogTags' });
Tag_1.default.belongsToMany(Blog_1.default, { through: BlogTag_1.default, foreignKey: 'tag_id', otherKey: 'blog_id', as: 'taggedBlogs' });
// Media associations
Media_1.default.belongsTo(User_1.default, { foreignKey: 'uploaded_by', as: 'uploader' });
User_1.default.hasMany(Media_1.default, { foreignKey: 'uploaded_by', as: 'uploadedMedia' });
// ActivityLog associations
ActivityLog_1.default.belongsTo(User_1.default, { foreignKey: 'user_id', as: 'user' });
User_1.default.hasMany(ActivityLog_1.default, { foreignKey: 'user_id', as: 'activityLogs' });
// Junction table associations
ProductTag_1.default.belongsTo(Product_1.default, { foreignKey: 'product_id', as: 'product' });
ProductTag_1.default.belongsTo(Tag_1.default, { foreignKey: 'tag_id', as: 'tag' });
BlogTag_1.default.belongsTo(Blog_1.default, { foreignKey: 'blog_id', as: 'blog' });
BlogTag_1.default.belongsTo(Tag_1.default, { foreignKey: 'tag_id', as: 'tag' });
