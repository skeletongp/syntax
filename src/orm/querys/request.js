export default class Request {
  constructor(db, data, validations, table) {
    this.db = db;
    this.table = table;
    this.data = data;
    this.validations = validations;
  }
  async validate() {
    try {
      const errors = {};

      //validate if table exists
      const tableExists = await this.tableExists();
      if (!tableExists) {
        errors["table"] = `La tabla ${this.table} no existe.`;
     
        return;
      }

      // Validate each key and its corresponding validations
      Object.keys(this.data).map(async (key) => {
        const exists = await this.columnExists(key);
        if (!exists) {
          errors[key] = `No se encontró la columna ${key} en la tabla ${this.table}.`;
        
          return;
        }
      });

      for (const [key, value] of Object.entries(this.validations)) {
        for (const validation of value) {
          var [validationType, ...args] = validation.split(":");
          if (args.length > 0) {
            args = args[0].split(",");
          }
          const result = await this[validationType](key, ...args);

          if (!result) {
            errors[key] = this.errorMessage(key, validationType);
            break;
          }
        }
      }

      // If there are errors, reject with the error messages
      if (Object.keys(errors).length > 0) {
        return new Promise((resolve, reject) => {
          reject({
            code: 402,
            data: errors,
          });
        });
      }
      return new Promise((resolve, reject) => {
        resolve({
          code: 200,
          data: this.data,
        });
      });
      // Otherwise, resolve with the validated data
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject({
          code: 500,
          data: error,
        });
      });
    }
  }

  errorMessage(key, validationType) {
    const field = this.validations[key];
    const rule = field.find((item) => item.includes(validationType));
    var restriction = "";
    if (rule) {
      const arrRule = rule.split(":");
      if (arrRule.length > 1) {
        restriction = arrRule[arrRule.length - 1];
      }
    }
    return {
      required: `El campo ${key} es obligatorio.`,
      email: `El campo ${key} debe ser un correo electrónico válido.`,
      url: `El campo ${key} debe ser una URL válida.`,
      unique: `El campo ${key} ya existe en la base de datos.`,
      exists: `El campo ${key} no existe en la base de datos.`,

      string: `El campo ${key} debe ser una cadena de texto.`,
      numeric: `El campo ${key} debe ser un número.`,
      array: `El campo ${key} debe ser un arreglo.`,
      object: `El campo ${key} debe ser un objeto.`,
      length: `La longitud de ${key} debe ser  ${restriction}.`,
      max: `La longitud de ${key} no puede ser mayor a ${restriction} .`,
      min: ` La longitud de ${key} no puede ser menor a ${restriction}.`,
    }[validationType];
  }

  async tableExists() {
    const result = await this.db.get(
      `SELECT COUNT(*) as count FROM sqlite_master WHERE type='table' AND name='${this.table}';`
    );
    const isCount = result[0].count != 0;
    return isCount;
  }

  async columnExists(key) {
    //check if column key exists in table
    const result = await this.db.get(
      `SELECT COUNT(*) as count FROM pragma_table_info('${this.table}') WHERE name='${key}';
        `
    );
    const isCount = result[0].count != 0;
    return isCount;
  }

  async required(key) {
    if (!this.data[key]) {
      return false;
    }
    return true;
  }
  async email(key) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.data[key])) {
      return false;
    }
    return true;
  }

  async url(key) {
    const urlRegex =
      /^(http|https):\/\/([\w]+\.)+[\w]{2,63}(\/[\w-_.~%]*)*\/?$/;
    if (!urlRegex.test(this.data[key])) {
      return false;
    }
    return true;
  }

  length(key, cant) {
    if (typeof this.data[key] === "string" || Array.isArray(this.data[key])) {
      if (this.data[key].length !== cant) {
        return false;
      }
    } else if (typeof this.data[key] === "number") {
      if (this.data[key] !== cant) {
        return false;
      }
    } else if (typeof this.data[key] === "object") {
      if (this.data[key].length !== cant) {
        return false;
      }
    }

    return true;
  }

  max(key, cant) {
    if (typeof this.data[key] === "string" || Array.isArray(this.data[key])) {
      if (this.data[key].length > cant) {
        return false;
      }
    } else if (typeof this.data[key] === "number") {
      if (this.data[key] > cant) {
        return false;
      }
    } else if (typeof this.data[key] === "object") {
      if (this.data[key].length > cant) {
        return false;
      }
    }
    return true;
  }

  min(key, cant) {
    if (typeof this.data[key] === "string" || Array.isArray(this.data[key])) {
      if (this.data[key].length < cant) {
        return false;
      }
    } else if (typeof this.data[key] === "number") {
      if (this.data[key] < cant) {
        return false;
      }
    } else if (typeof this.data[key] === "object") {
      if (this.data[key].length < cant) {
        return false;
      }
    }
    return true;
  }

  async unique(key, table, column) {
    const id = this.data.id || 0;
    const result = await this.db.get(
      `SELECT * FROM ${table} WHERE ${column} = ? AND id<>?`,
      [this.data[key], id]
    );
    if (result && result.length > 0) {
      return false;
    }
    return true;
  }

  async exists(key, table, column) {
    const result = await this.db.get(
      `SELECT * FROM ${table} WHERE ${column} = ?`,
      this.data[key]
    );
    if (!result || result.length === 0) {
      return false;
    }
    return true;
  }

  async between(key, min, max) {
    if (!NaN(this.data[key])) {
      if (this.data[key] < min || this.data[key] > max) {
        return false;
      }
    } else {
      return false;
    }
    return true;
  }

  async string(key) {
    if (typeof this.data[key] !== "string") {
      return false;
    }
    return true;
  }

  async numeric(key) {
    if (isNaN(this.data[key])) {
      return false;
    }
    return true;
  }

  async array(key) {
    if (!Array.isArray(this.data[key])) {
      return false;
    }
    return true;
  }
}
