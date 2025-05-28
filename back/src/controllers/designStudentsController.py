import re 
from flask import request, jsonify
from models.DesignStudentsModel import db, DesignStudents 
from models.TabletModel import Tablet

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

def create_designStudent():
    
    data = request.get_json()
    print(data)
    cedula = data.get('cedula')
    nombre = data.get('nombre')     
    apellido = data.get('apellido')
    telefono = data.get('telefono')
    modalidad_de_estudio = data.get('modalidad_de_estudio')
    cantidad_asignaturas = data.get('cantidad_asignaturas')
    FK_serial = data.get('serial')

    if not all([cedula, nombre, apellido, telefono, modalidad_de_estudio, cantidad_asignaturas]):
        return jsonify({"error": "Faltan datos requeridos"}), 400
    
    if not solo_numeros(cedula):
        return jsonify({"error": "La cédula solo debe contener números"}), 400
    if not solo_letras(nombre):
        return jsonify({"error": "El nombre solo debe contener letras"}), 400
    if not solo_letras(apellido):
        return jsonify({"error": "El apellido solo debe contener letras"}), 400
    if not solo_numeros(telefono):
        return jsonify({"error": "El teléfono solo debe contener números"}), 400
    if not solo_letras(modalidad_de_estudio):
        return jsonify({"error": "La modalidad de estudio solo debe contener letras"}), 400
    if not es_entero(cantidad_asignaturas):
        return jsonify({"error": "La cantidas de asginaturas solo debe contener numeros"}), 400

    
    new_designStudent = DesignStudents(
        cedula=cedula,
        nombre=nombre,
        apellido=apellido,
        telefono=telefono,
        modalidad_de_estudio=modalidad_de_estudio,
        cantidad_asignaturas=cantidad_asignaturas,
        FK_serial = FK_serial or None,
    )
    db.session.add(new_designStudent)
    db.session.commit()

    return jsonify({
        "estdudiante indexado con el id": new_designStudent.id,
        "message": "Estudiante creado exitosamente",
    }), 201

def get_designsStudent():
    estudiantesDiseño = DesignStudents.query.all()
    return jsonify([estudianteDiseño.to_dict() for estudianteDiseño in estudiantesDiseño]), 200

def get_designStudent(id):
    estudianteDiseño = DesignStudents.query.get_or_404(id)
    return jsonify(estudianteDiseño.to_dict()), 200

def update_designStudent(id):
    data = request.get_json()
    estudianteDiseño = DesignStudents.query.get_or_404(id)

    estudianteDiseño.cedula = data.get('cedula', estudianteDiseño.cedula)
    estudianteDiseño.nombre = data.get('nombre', estudianteDiseño.nombre)
    estudianteDiseño.apellido = data.get('apellido', estudianteDiseño.apellido)
    estudianteDiseño.telefono = data.get('telefono', estudianteDiseño.telefono)
    estudianteDiseño.modalidad_de_estudio = data.get('modalidad_de_estudio', estudianteDiseño.modalidad_de_estudio)
    estudianteDiseño.cantidad_asignaturas = data.get('cantidad_asignaturas', estudianteDiseño.cantidad_asignaturas)
    if 'tablet_id' in data:
        estudianteDiseño.tablet_id = data['tablet_id']
        tablet = Tablet.query.get(data['tablet_id'])
        if tablet and tablet.disponible:
            tablet.disponible = False  # Lo marcas como rentado
        else:
            return jsonify({'error': 'La tablet no está disponible'}), 400

    db.session.commit()

    return jsonify(estudianteDiseño.to_dict()), 200

def delete_designStudent(id):
    estudianteDiseño = DesignStudents.query.get_or_404(id)
    db.session.delete(estudianteDiseño)
    db.session.commit()
    return jsonify({"message": "Estudiante eliminado exitosamente"}), 200

def search_designStudent():
    nombre = request.args.get('nombre', '').strip()
    cedula = request.args.get('cedula', '').strip()

    query = DesignStudents.query

    if nombre and cedula:
        query = query.filter(
            DesignStudents.nombre.ilike(f"%{nombre}%"),
            DesignStudents.cedula.ilike(f"%{cedula}%")
        )
    elif nombre:
        query = query.filter(DesignStudents.nombre.ilike(f"%{nombre}%"))
    elif cedula:
        query = query.filter(DesignStudents.cedula.ilike(f"%{cedula}%"))
    else:
        # Si no hay parámetros, retornar lista vacía
        return jsonify([])

    estudiantes = query.all()
    if not estudiantes:
        return jsonify({"mensaje": "Estudiante no encontrado"}), 404
    return jsonify([e.to_dict() for e in estudiantes])