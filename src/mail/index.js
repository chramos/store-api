function passwordResetTemplate(user, hash) {
    return (
        '<style type="text/css">\
            @import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,700"); \
            .logo {\
                font-family: "Open Sans", sans-serif;\
                font-weight: 300;\
                color: rgb(40, 40, 40);\
                font-size: 24px;\
                width: 600px\
            }\
            .logo span {\
                letter-spacing: 3px;\
            }\
            .content {\
                font-family: "Open Sans", sans-serif;\
                font-weight: bold;\
                color: rgb(101, 101, 101); \
                padding: 20px; \
                font-size: 18px;\
                width: 600px;\
                background: #fafafa;\
                border-radius: 4px;\
            }\
            button {\
                border-radius: 4px;\
                border: 1px solid;\
                color: #fff;\
                background-color: #1890ff;\
                border-color: #1890ff;\
                text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);\
                box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);\
                padding: 10px 80px;\
                font-size: 24px;\
              }\
        </style>\
        <div>\
            <p class="logo">\
              <span>LOJA</span><span style="font-weight: 700;">VIRTUAL</span>\
            </p>\
        </div>\
        <div class="content">\
            <p>Você nos disse que esqueceu sua senha. Se você realmente esqueceu, precione aqui para redefini-la:</p>\
            <p style="margin: 50px 0; text-align: center;">\
                <a href="http://localhost:3000/recuperar-senha/' + user._id + '/' + hash +'"> \
                   <button>Refinir Senha</button>\
                </a> \
            </p>\
            <p style="font-weight: 400; font-size: 16px; color: #909090">Se você solicitou isso por engano, você pode somente ignorar este email.\
            <br />Sua senha não mudará.</p>\
            <br /><br /><br />\
            <span style="font-weight: 400; font-size: 16px;">Atenciosamente,<br />LojaVirtual</span>\
        </div>\
        '
    );
    
}

module.exports = { passwordResetTemplate }