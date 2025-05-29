import re
from flask import request, jsonify
from models.PcModel import db, Pcs
from models.EstudiantesModel import Estudiante


def solo_letras(texto):
    return bool(re.fullmatch(r'[A-Za-zÁÉÍÓÚáéíóúñÑ ]+', texto))


def solo_numeros(texto):
    return bool(re.fullmatch(r'\d+', texto))


def sin_caracteres_especiales(texto):
    return bool(re.fullmatch(r'[A-Za-z0-9 ]+', texto))


def es_entero(valor):
    try:
        int(valor)
        return True
    except (ValueError, TypeError):
        return False


def es_decimal(valor):
    try:
        float(valor)
        return True
    except (ValueError, TypeError):
        return False


def create_pc():
    data = request.get_json()

    serial = data.get('serial')
    marca = data.get('marca')
    tamaño = data.get('tamaño')
    precio = data.get('precio')
    sistema_operativo = data.get('sistema_operativo')
    procesador = data.get('procesador')
    disponible = data.get('disponible')

    if not all([serial, marca, tamaño, precio, sistema_operativo, procesador]):
        return jsonify({"error": "Faltan datos requeridos"}), 400
    if not solo_letras(marca):
        return jsonify({"error": "La marca solo debe contener letras"}), 400
    if not es_decimal(tamaño):
        return jsonify({"error": "El tamaño solo debe contener numeros decimales"}), 400
    if not es_decimal(precio):
        return jsonify({"error": "El precio solo debe contener números decimales"}), 400
    if not sin_caracteres_especiales(sistema_operativo):
        return jsonify({"error": "El sistema operativo no debe tener caracteres especiales"}), 400


    nuevo_pc = Pcs(
        serial=serial,
        marca=marca,
        tamaño=tamaño,
        precio=precio,
        sistema_operativo=sistema_operativo,
        procesador=procesador,
        disponible=disponible
    )
    db.session.add(nuevo_pc)
    db.session.commit()

    return jsonify({
        "estdudiante indexado con el id": nuevo_pc.id,
        "message": "Estudiante creado exitosamente",
    }), 201


def show_pcs():
    pcs = Pcs.query.all()
    return jsonify([pcs.to_dict() for pcs in pcs]), 200


def get_computer(id):
    computer = Pcs.query.get_or_404(id)
    return jsonify(computer.to_dict()), 200


def rentar_pc_a_estudiante():
    data = request.get_json()
    pc_id = data.get('pc_id')
    estudiante_id = data.get('estudiante_id')

    if not pc_id or not estudiante_id:
        return jsonify({"error": "Faltan el ID del PC o del estudiante"}), 400

    # Obtener el PC
    pc = Pcs.query.get(pc_id)
    if not pc:
        return jsonify({"error": "PC no encontrado"}), 404

    if not pc.disponible:
        return jsonify({"error": "El PC ya está rentado"}), 400

    # Obtener el estudiante
    estudiante = Estudiante.query.get(estudiante_id)
    if not estudiante:
        return jsonify({"error": "Estudiante no encontrado"}), 404

    # Asignar el serial del PC al estudiante (o el campo que uses para vincular)
    estudiante.serial = pc.serial  # o estudiante.pc_id = pc.id si usas esa relación
    estudiante.pc_asignado = True # Cambia esto a True si el estudiante ya tiene un PC asignado
    # Marcar el PC como no disponible
    pc.disponible = False

    db.session.commit()

    return jsonify({"message": "PC rentado correctamente"}), 200


def devolver_pc():
    data = request.get_json()
    serial = data.get('serial')
    estudiante_id = data.get('estudiante_id')
    print(data)
    if not estudiante_id or not serial:
        return jsonify({"error": "Faltan el ID del PC o del estudiante"}), 400

    estudiante = Estudiante.query.get(estudiante_id)

    if not estudiante:
        return jsonify({"error": "Estudiante no encontrado"}), 404

    pc = Pcs.query.filter_by(serial=serial).first()
    if not pc:
        return jsonify({"error": "PC no encontrado"}), 404

    estudiante.serial = None
    estudiante.pc_asignado = False
    pc.disponible = True
    db.session.commit()

    return jsonify({"message": "PC devuelto correctamente"}), 200


def eliminar_Pc(id):
    pc = Pcs.query.get_or_404(id)
    db.session.delete(pc)
    db.session.commit()
    return jsonify({"message": "Computador eliminado exitosamente"}), 200


def update_pc(id):
    data = request.get_json()
    pc = Pcs.query.get_or_404(id)

    pc.serial = data.get('serial', pc.serial)
    pc.marca = data.get('marca', pc.marca)
    pc.tamaño = data.get('tamaño', pc.tamaño)
    pc.precio = data.get('precio', pc.precio)
    pc.sistema_operativo = data.get('sistema_operativo', pc.sistema_operativo)
    pc.procesador = data.get('procesador', pc.procesador)

    db.session.commit()
    return jsonify(pc.to_dict()), 200


def buscar_pc():
    marca = request.args.get('marca', '').strip()
    serial = request.args.get('serial', '').strip()

    query = Pcs.query

    if marca and serial:
        query = query.filter(
            Pcs.marca.ilike(f"%{marca}%"),
            Pcs.serial.ilike(f"%{serial}%")
        )
    elif marca:
        query = query.filter(Pcs.marca.ilike(f"%{marca}%"))
    elif serial:
        query = query.filter(Pcs.serial.ilike(f"%{serial}%"))
    else:
        return jsonify([])

    pc = query.all()

    if not pc:
        return jsonify({"mensaje": "PC no encontrada"}), 404
    return jsonify([e.to_dict() for e in pc]), 200
