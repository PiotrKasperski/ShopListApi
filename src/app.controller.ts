import { Controller, Get, Logger } from '@nestjs/common';
import { Console } from 'console';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    Logger.log('Connect')
    return JSON.stringify({
      status: "200",
      data:{
          count: 2,
          lists: [{
              name:"Pierwsza",
              products:[
                  {
                      name: " produkt1",
                      count: 1
                  },{
                      name: " produkt2",
                      count: 29
                  }
              ]
          },{
              name:"Druga",
              products:[
                  {
                      name: " produkt1",
                      count: 1423532563456123423154
                  },{
                      name: " produkt2",
                      count: 32421542
                  },{
                      name: " produkt2",
                      count: 123
                  },{
                      name: " produkt9",
                      count: 1234
                  },{
                      name: " produkt2343243",
                      count: 12345
                  },{
                      name: " produkt234",
                      count: 1234567
                  }
              ]
          }]
      } 
      
  })
  }
}
