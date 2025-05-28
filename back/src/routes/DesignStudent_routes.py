from flask import Blueprint
from controllers.designStudentsController import create_designStudent, get_designsStudent, get_designStudent, update_designStudent, delete_designStudent, search_designStudent

designStudents_routes = Blueprint('designStudents_routes', __name__)

@designStudents_routes.route('/estudiantes-diseño', methods=['POST'])
def add_designStudent():
    return create_designStudent()

@designStudents_routes.route('/estudiantes-diseño', methods=['GET'])
def list_designStudent():
    return get_designsStudent()

@designStudents_routes.route('/estudiantes-diseño/<int:id>', methods=['GET'])
def get_single_designStudent(id):
    return get_designStudent(id)

@designStudents_routes.route('/estudiantes-diseño/<int:id>', methods=['PUT'])
def modify_designEstudent(id):
    return update_designStudent(id)

@designStudents_routes.route('/estudiantes-diseño/<int:id>', methods=['DELETE'])
def remove_designStudent(id):
    return delete_designStudent(id)

@designStudents_routes.route('/estudiantes-diseño/buscar', methods=['GET'])
def find_designStudent():
    return search_designStudent()