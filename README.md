# Estructura de Datos - Proyecto en Python

Este proyecto está desarrollado en Python utilizando Flask, SQLAlchemy y PostgreSQL como base de datos.

## 📦 Requisitos

- Python 3.8 o superior
- pip
- PostgreSQL instalado y corriendo
- (Opcional) Entorno virtual recomendado

## 🚀 Instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/tu-usuario/estructura-de-datos-proyecto.git
cd estructura-de-datos-proyecto

Crear y activar entorno virtual
python -m venv venv
source venv/Scripts/activate
python src/index.py

Instalar dependencias
pip install -r requirements.txt

Configurar variables de entorno
FLASK_APP=src/index.py
FLASK_ENV=development
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/tu_basededatos

Para crear las tablas usar las siguientes sentencias SQL

CREATE TABLE estudiantes (
    id SERIAL PRIMARY KEY,
    cedula VARCHAR(50) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    telefono VARCHAR(50) NOT NULL,
    semestre_actual INTEGER,
    promedio_acumulado FLOAT,
    serial VARCHAR(50),
    pc_asignado BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_pc_serial FOREIGN KEY (serial) REFERENCES pcs(serial)
);

CREATE TABLE pcs (
    id SERIAL PRIMARY KEY,
    serial VARCHAR(50) NOT NULL UNIQUE,
    marca VARCHAR(50) NOT NULL,
    tamaño FLOAT NOT NULL,
    precio FLOAT NOT NULL,
    sistema_operativo VARCHAR(50) NOT NULL,
    procesador VARCHAR(50) NOT NULL,
    disponible BOOLEAN DEFAULT TRUE
);

CREATE TABLE tablets (
    id SERIAL PRIMARY KEY,
    serial VARCHAR(50) NOT NULL UNIQUE,
    marca VARCHAR(50) NOT NULL,
    tamaño FLOAT NOT NULL,
    precio FLOAT NOT NULL,
    almacenamiento VARCHAR(50) NOT NULL,
    peso FLOAT NOT NULL,
    disponible BOOLEAN DEFAULT TRUE
);

CREATE TABLE "designStudents" (
    id SERIAL PRIMARY KEY,
    cedula VARCHAR(50) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    telefono VARCHAR(50) NOT NULL,
    modalidad_de_estudio VARCHAR(50),
    cantidad_asignaturas INTEGER,
    FK_serial VARCHAR(50),
    tablet_asignado BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_tablets_serial FOREIGN KEY (FK_serial) REFERENCES tablets(serial)
);