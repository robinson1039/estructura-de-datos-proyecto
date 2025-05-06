from flask import Blueprint
from controllers.estudiantesController import create_estudiante, get_estudiantes, get_estudiante, update_estudiante, delete_estudiante , buscar_estudiante

estudiantes_routes = Blueprint('estudiantes_routes', __name__)

@estudiantes_routes.route('/estudiantes', methods=['POST'])
def add_estudiante():
    return create_estudiante()

@estudiantes_routes.route('/estudiantes', methods=['GET'])
def list_estudiantes():
    return get_estudiantes()

@estudiantes_routes.route('/estudiantes/<int:id>', methods=['GET'])
def get_single_estudiante(id):
    return get_estudiante(id)

@estudiantes_routes.route('/estudiantes/<int:id>', methods=['PUT'])
def modify_estudiante(id):
    return update_estudiante(id)

@estudiantes_routes.route('/estudiantes/<int:id>', methods=['DELETE'])
def remove_estudiante(id):
    return delete_estudiante(id)

@estudiantes_routes.route('/estudiantes/buscar', methods=['GET'])
def search_estudiante():
    return buscar_estudiante()