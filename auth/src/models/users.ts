import mongoose from 'mongoose';
import { Password } from '../services/password';

// yeni kullanıcı oluşturmak için bir ara yüz
// eğer bu interfayi yazmazsak typecript modelw ait password ve email alanalrını tanımıyor.
interface UserAttrs {
  email: string;
  password: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
}, {
  toJSON: {
    transform(doc,ret){
      ret.id = ret._id;
      delete ret._id;// geriye dönen _id bilgisi id olarak değiştirildi.
      delete ret.password;//geriye dönen user bilgisinde password, __v bilgisi silindi.
      delete ret.__v;
    }
  }
});

//veri kayıt olmadan hemen önce password haslenir. Kayıttan önce çalışan middelware
userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
