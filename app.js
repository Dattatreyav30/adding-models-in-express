const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');



const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item')
const app = express();


app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
//User.hasMany(Product);

User.hasOne(Cart)
//Cart.belongsTo(User)

Cart.belongsToMany(Product, { through: CartItem });  //one cart can have multiple products

Product.belongsToMany(Cart, { through: CartItem }); //single product can be part of multiple carts



app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      console.log(user)
      next();
    })
    .catch((err) => {
      console.error("cant find yo");
    })
})

sequelize
  .sync()
  .then(result => {
    return User.findByPk(1)
  })
  .then((user) => { 
    if (!user) {
      return User.create({ name: 'datta', email: 'test@test.com' })
    }
    return user
  })
  .then((user) => {
    return user.createCart();
  })
  .then((cart)=>{
    app.listen(3000)
  })
  .catch(err => {
    console.log(err);
  });
