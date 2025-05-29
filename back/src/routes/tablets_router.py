from flask import Blueprint
from controllers.tabletsController import create_tablet, show_tablets, rentar_tablet_a_estudiante, devolver_tablet, eliminar_tablet, buscar_tablet, get_tablet, update_tablet

tablets_routes = Blueprint('tablets_routes', __name__)


@tablets_routes.route('/tablets', methods=['POST'])
def add_pc():
    return create_tablet()


@tablets_routes.route('/tablets', methods=['GET'])
def get_pcs():
    return show_tablets()


@tablets_routes.route('/tablets/<int:id>', methods=['GET'])
def get_single_tablet(id):
    return get_tablet(id)


@tablets_routes.route('/tablets/<int:id>', methods=['DELETE'])
def delete_tablet(id):
    return eliminar_tablet(id)


@tablets_routes.route('/tablets/rentar', methods=['PUT'])
def rentar_pc():
    return rentar_tablet_a_estudiante()


@tablets_routes.route('/tablets/devolver', methods=['PUT'])
def return_pc():
    return devolver_tablet()


@tablets_routes.route('/tablets/<int:id>', methods=['PUT'])
def modify_tablet(id):
    return update_tablet(id)


@tablets_routes.route('/tablets/buscar', methods=['GET'])
def search_tablet():
    return buscar_tablet()
