import * as nodemailer from 'nodemailer'; 
 
export class EMailService { 
  private _transporter: nodemailer.Transporter; 
  constructor() { 
    this._transporter = nodemailer.createTransport( 
      'smtp://localhost:1025',
     // `smtps://<username>%40gmail.com:<password>@smtp.gmail.com` 
    ); 
  } 
  
  sendMail(to: string, subject: string, content: string) 
  : Promise<void> 
  { 
    let options = { 
      from: 'learnup@email.com', 
      to: to, 
      subject: subject, 
      text: content 
    } 

    return new Promise<void> ( 
      (resolve: (msg: any) => void,  
        reject: (err: Error) => void) => { 
          this._transporter.sendMail(  
            options, (error, info) => { 
              if (error) { 
                console.log(`error: ${error}`); 
                reject(error); 
              } else { 
                  console.log(`Message Sent 
                    ${info.response}`); 
                  resolve(`Message Sent  
                    ${info.response}`); 
              } 
          }) 
        } 
    ); 
  } 

} 
