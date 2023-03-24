import User from "../orm/models/User.js";
import requestUser from "../orm/requests/requestUser.js";

export default class UserController {
  constructor() {
    this.db = window.db;
    this.User = new User(this.db);
  }

  async index() {
    try {
      const users = await this.User.get();
      return {
        code: 200,
        data: users,
      };
    } catch (error) {
      return {
        code: 500,
        data: error,
      };
    }
  }

  async store(data) {
    if(data.password) data.password = data.password.hash();
    const validatedData = new requestUser(this.db, data).validate();
    return new Promise((resolve, reject) => {
      validatedData
        .then(async (res) => {
          data.username=data.username.toLowerCase();
          const user = await this.User.create(res.data)
            .then((res) => {
              resolve({
                code: 201,
                data: res,
              });
            })
            .catch((error) => {
              resolve({
                code: 500,
                data: error,
              });
            });
          resolve({
            code: 201,
            data: user,
          });
        })
        .catch((error) => {
          resolve(error);
        });
    });
  }

  async show(id) {
    try {
      const user = await this.User.find(id);
      if (user) {
        return {
          code: 200,
          data: user,
        };
      } else {
        return {
          code: 404,
          data: "Usuario no encontrado",
        };
      }
    } catch (error) {
      return {
        code: 500,
        data: error,
      };
    }
  }

  async update(data, id = null) {
    try {
      if (!data.id && id) {
        data.id = id;
      }
      if(data.password) data.password = data.password.hash();
      const user = await this.User.find(data.id);
      Object.keys(data).forEach((key) => {
        user[key] = data[key];
      });
      await this.User.update(user);

      return {
        code: 200,
        data: "Usuario actualizado",
      };
    } catch (error) {
      return {
        code: 500,
        data: error,
      };
    }
  }

  async destroy(id) {
    try {
      const user = await this.User.delete(id);
      return {
        code: 200,
        data: "Usuario eliminado",
      };
    } catch (error) {
      return {
        code: 500,
        data: error,
      };
    }
  }

  async login(data) {
    try {
      const { username, password } = data;
      const user = await this.User.where("username", username.toLowerCase()).first();
      if (user) {
        const isPasswordValid = user.password === password.hash();
        if (isPasswordValid) {
          return {
            code: 200,
            data: user,
          };
        } else {
          return {
            code: 401,
            data: "Contraseña incorrecta",
          };
        }
      } else {
        return {
          code: 404,
          data: "Usuario no encontrado",
        };
      }
    } catch (error) {
      return {
        code: 500,
        data: error,
      };
    }
  }
}
