import dino from '../assets/dino.png'

function LoginPage() {
    return (
        <div className="align-items-center text-bg-dark vw-100 vh-100 d-flex"
        style={{
                backgroundImage: `url(${dino})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right center",
                backgroundSize: "auto 100%"
        }}>
            <div className="container w-50 ms-5 p-3 text-bg-light rounded">
                <h3 className="text-center">Bem vindo ao <span className="text-danger">CineRex</span>!</h3>
                <p className="text-center text-secondary">Preencha os dados de login para acessar</p>
                <form>
                    <div className="m-5">
                        <label className="form-label" htmlFor="usuario">Usuario</label>
                        <input className="form-control" type="text" id="usuario" />
                    </div>
                    <div className="m-5">
                        <label className="form-label" htmlFor="senha">Senha</label>
                        <input className="form-control" type="password" id="senha" />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="px-5 text-center btn btn-danger">Entrar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
