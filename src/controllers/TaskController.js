import Task from "../orm/models/Task.js";
import requestTask from "../orm/requests/requestTask.js";

export default class TaskController {
  constructor() {
    this.db = window.db;
    this.Task = new Task(this.db);
  }

  async index(params) {
    try {
      var query=this.Task;
      Object.entries(params).map(([key, value]) => {
        if(value){
          query=query[key](...Object.values(value));
        }
      });
    const tasks=await query.get();
      return {
        code: 200,
        data: tasks,
      };
    } catch (error) {
      console.log(error)
      return {
        code: 500,
        data: error,
      };
    }
  }

  async store(data) {
    var time=data.due_time.split("T");
    if(time.length>0){
     time=time[1].substring(0,5);
    }
    data.due_time=time;
    const validatedData = new requestTask(this.db, data).validate();
    return new Promise((resolve, reject) => {
      validatedData
        .then(async (res) => {
          const task = await this.Task.create(res.data)
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
            data: task,
          });
        })
        .catch((error) => {
          resolve(error);
        });
    });
  }

  async show(id) {
    try {
      const task = await this.Task.find(id);
      if (task) {
        return {
          code: 200,
          data: task,
        };
      } else {
        return {
          code: 404,
          data: "Tarea no encontrada",
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
      const task = await this.Task.find(data.id);
      Object.keys(data).forEach((key) => {
        task[key] = data[key];
      });
      await this.Task.update(Task);

      return {
        code: 200,
        data: "Tarea actualizada",
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
       await this.Task.delete(id);
      return {
        code: 200,
        data: "Tarea eliminada",
      };
    } catch (error) {
      return {
        code: 500,
        data: error,
      };
    }
  }

 
}