import React from 'react'

export default function Login() {
    return (
        <div id="login">
            <div className="container">
                <div id="login-row" className="row justify-content-center align-items-center">
                 <div id="login-column" className="col-md-6">
                    <div id="login-box" className="col-md-12">
                        <form id="login-form" className="form" action="" method="post">
                            <h3 className="text-center text-info">Iniciar Sesión</h3>
                            <div className="form-group">
                                <label for="username" className="text-info">Nombre de usuario:</label><br/>
                                <input type="text" name="username" id="username" className="form-control"/>
                            </div>
                            <div class="form-group">
                                <label for="password" className="text-info">Contraseña:</label><br/>
                                <input type="text" name="password" id="password" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <input type="submit" name="submit" class="btn btn-info btn-md" value="Entrar"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
