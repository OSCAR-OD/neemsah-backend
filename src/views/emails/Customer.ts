export default (data:any) => {
    return  `
  <!doctype html>
  <html lang="en-US">
  
  <head>
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title>Meeting schedule confirmation email</title>
      <meta name="description" content="Reset Password Email Template.">
      <style type="text/css">
          a:hover {text-decoration: underline !important;}
      </style>
  </head>
  
  <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
      <!--100% body table-->
      <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
          style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
          <tr>
              <td>
                  <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                      align="center" cellpadding="0" cellspacing="0">
                      <tr>
                          <td style="height:80px;">&nbsp;</td>
                      </tr>
                      <tr>
                          <td style="text-align:center;">
                            <a href="https://goplexn.com" title="logo" target="_blank">
                              <img width="150" src="https://i.ibb.co/fCY14Nr/logo.png" title="logo" alt="logo">
                            </a>
                          </td>
                      </tr>
                      <tr>
                          <td style="height:20px;">&nbsp;</td>
                      </tr>
                      <tr>
                          <td>
                              <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                  style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                  <tr>
                                      <td style="height:40px;">&nbsp;</td>
                                  </tr>
                                  <tr>
                                      <td style="padding:0 35px;">
                                          <h6 style="text-align: left;color:#455056; font-size:15px;line-height:24px; margin:0;">
                                              Dear ${data.name},<br />
                                             </h6>
                                          <p style="text-align: left;color:#455056; font-size:15px;line-height:24px; margin:0;">
                                              <br />
                                              Thank you for scheduling a meeting with us. Please find the details below.
                                              <br /> 
                                             </p>
                                             <h4 style="text-align: left;color:#455056; font-size:15px;line-height:24px; margin:0;">
                                              Meeting Date: ${data.date}<br />
                                             </h4>
                                              <h4 style="text-align: left;color:#455056; font-size:15px;line-height:24px; margin:0;">
                                              Meeting Time: ${data.time}<br />
                                             </h4>
                                              <h4 style="text-align: left;color:#455056; font-size:15px;line-height:24px; margin:0;">
                                              Meeting Timezone: ${data.timezone}<br />
                                             </h4>
                                              <h4 style="text-align: left;color:#455056; font-size:15px;line-height:24px; margin:0;">
                                              Meeting Agenda: ${data.agenda}<br />
                                             </h4>
                                                <p style="text-align: left;color:#455056; font-size:15px;line-height:24px; margin:0;">
                                              Thank you again and we appreciate it. Also, we will be sending you meeting details soon.<br />
                                              Best Regards,
                                              <br />
                                              Goplexn Schedule Team. 
                                             </p>
                                          </td>
                                  </tr>
                                  <tr>
                                      <td style="height:40px;">&nbsp;</td>
                                  </tr>
                              </table>
                          </td>
                      <tr>
                          <td style="height:20px;">&nbsp;</td>
                      </tr>
                      <tr>
                          <td style="text-align:center;">
                              <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>www.Goplexn.com</strong></p>
                          </td>
                      </tr>
                      <tr>
                          <td style="height:80px;">&nbsp;</td>
                      </tr>
                  </table>
              </td>
          </tr>
      </table>
      <!--/100% body table-->
  </body>
  
  </html>
  `
  }