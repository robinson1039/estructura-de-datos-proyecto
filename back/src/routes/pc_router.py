from flask import Blueprint
from controllers.pcsController import create_pc, show_pcs, rentar_pc_a_estudiante, devolver_pc, eliminar_Pc, get_computer, update_pc, buscar_pc

pcs_routes = Blueprint('pcs_routes', __name__)

@pcs_routes.route('/computadoras', methods=['POST'])
def add_pc():
    return create_pc()

@pcs_routes.route('/computadoras', methods=['GET'])
def get_pcs():
    return show_pcs()

@pcs_routes.route('/computadoras/<int:id>', methods=['GET'])
def get_single_computer(id):
    return get_computer(id)

@pcs_routes.route('/computadoras/<int:id>', methods=['DELETE'])
def delete_pc(id):
    return eliminar_Pc(id)

@pcs_routes.route('/computadoras/rentar', methods=['PUT'])
def rentar_pc():
    return rentar_pc_a_estudiante()

@pcs_routes.route('/computadoras/devolver', methods=['PUT'])
def return_pc():
    return devolver_pc()

@pcs_routes.route('/computadoras/<int:id>', methods=['PUT'])
def modify_computer(id):
    return update_pc(id)

@pcs_routes.route('/computadoras/buscar', methods=['GET'])
def search_pc():
    return buscar_pc()


