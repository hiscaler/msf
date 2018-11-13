export class ResponseBody {
  success: boolean;
  data: any;
  error: {
    message: any
  };

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
