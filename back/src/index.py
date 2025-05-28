from flask import Flask
from sqlalchemy import text
from routes.estudiantes_routes import estudiantes_routes
from routes.DesignStudent_routes import designStudents_routes
from routes.pc_router import pcs_routes
from routes.tablets_router import tablets_routes
from config.dbConfig import db, init_db
from flask_cors import CORS

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)
init_db(app)

@app.route('/')
def home():
    try:
        db.session.execute(text('SELECT 1'))
        print("Conexión a la base de datos exitosa")
        return "Conexión a la base de datos exitosa"
    except Exception as e:
        print(f"Error al conectar a la base de datos: {e}")
        return "Error al conectar a la base de datos"

app.register_blueprint(estudiantes_routes, url_prefix='/')
app.register_blueprint(pcs_routes, url_prefix='/pcs')
app.register_blueprint(tablets_routes, url_prefix='/tab')
app.register_blueprint(designStudents_routes, url_prefix='/diseño')

if __name__ == "__main__":
    with app.app_context():
        db.create_all()  # Se crea la base de datos/tables cuando arranca el servidor
    app.run(debug=True)