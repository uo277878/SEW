CREATE TABLE IF NOT EXISTS carrera(
	idCarr INT NOT NULL,
	nombreCarr VARCHAR(20) NOT NULL,
	duracionCarr INT NOT NULL,
	num_asignaturas INT NOT NULL,
	PRIMARY KEY (idCarr)
);

CREATE TABLE IF NOT EXISTS coordinador(
	dniCoor INT NOT NULL,
	nombreCoor VARCHAR(20) NOT NULL,
	apellidoCoor VARCHAR(20) NOT NULL,
	PRIMARY KEY (dniCoor)
);

CREATE TABLE IF NOT EXISTS asignatura(
	idAsig INT NOT NULL,
	idCarr INT NOT NULL,
	dniCoor INT NOT NULL,
	nombreAsig VARCHAR(20) NOT NULL,
	creditos INT NOT NULL,
	tipo VARCHAR(20) NOT NULL
    CHECK (tipo IN ('obligatoria','optativa')),
	PRIMARY KEY (idAsig),
	FOREIGN KEY(idCarr) references carrera(idCarr),
	FOREIGN KEY(dniCoor) references coordinador(dniCoor)
);

CREATE TABLE IF NOT EXISTS profesor(
	dniProf VARCHAR(8) NOT NULL,
    nombreProf VARCHAR(20) NOT NULL,
    apellidoProf VARCHAR(20) NOT NULL,
    domicilioProf VARCHAR(20),
    PRIMARY KEY(dniProf)
);

CREATE TABLE IF NOT EXISTS imparte(
	idAsig INT NOT NULL,
	dniProf VARCHAR(8) NOT NULL,
	PRIMARY KEY(idAsig, dniProf),
	FOREIGN KEY(idAsig) REFERENCES asignatura(idAsig),
	FOREIGN KEY(dniProf) REFERENCES profesor(dniProf)
);

CREATE TABLE IF NOT EXISTS alumno(
	dniAlum VARCHAR(8),
    nombreAlum VARCHAR(20),
    apellidoAlum VARCHAR(20),
    domicilioAlum VARCHAR(20),
    PRIMARY KEY (dniAlum)
);

CREATE TABLE IF NOT EXISTS cursa(
	idAsig INT NOT NULL,
	dniAlum VARCHAR(8) NOT NULL,
	PRIMARY KEY(idAsig, dniAlum),
	FOREIGN KEY(idAsig) REFERENCES asignatura(idAsig),
	FOREIGN KEY(dniAlum) REFERENCES alumno(dniAlum)
);
INSERT INTO CARRERA(idCarr, nombreCarr, duracionCarr, num_asignaturas) VALUES (1, "informatica", 6, 38);
INSERT INTO CARRERA(idCarr, nombreCarr, duracionCarr, num_asignaturas) VALUES (2, "contabilidad", 5, 34);
INSERT INTO CARRERA(idCarr, nombreCarr, duracionCarr, num_asignaturas) VALUES (3, "economia", 4, 35);
INSERT INTO CARRERA(idCarr, nombreCarr, duracionCarr, num_asignaturas) VALUES (4, "magisterio", 4, 30);

INSERT INTO COORDINADOR(dniCoor, nombreCoor, apellidoCoor) VALUES(1234, "Jose Manuel", "Redondo");
INSERT INTO COORDINADOR(dniCoor, nombreCoor, apellidoCoor) VALUES(2345, "Oliverio", "Gonzalez");
INSERT INTO COORDINADOR(dniCoor, nombreCoor, apellidoCoor) VALUES(3456, "Jordan", "Espada");
INSERT INTO COORDINADOR(dniCoor, nombreCoor, apellidoCoor) VALUES(4567, "Cristian", "Garcia");

INSERT INTO COORDINADOR(dniCoor, nombreCoor, apellidoCoor) VALUES(2134, "Marcelino", "Gonzalez");
INSERT INTO COORDINADOR(dniCoor, nombreCoor, apellidoCoor) VALUES(3412, "Anabel", "Alonso");
INSERT INTO COORDINADOR(dniCoor, nombreCoor, apellidoCoor) VALUES(4321, "Miguel", "Hernandez");
INSERT INTO COORDINADOR(dniCoor, nombreCoor, apellidoCoor) VALUES(4312, "Florentino", "Fernandez");

INSERT INTO COORDINADOR(dniCoor, nombreCoor, apellidoCoor) VALUES(2222, "Noelia", "Suarez");
INSERT INTO COORDINADOR(dniCoor, nombreCoor, apellidoCoor) VALUES(3333, "Paula", "Gonzalez");
INSERT INTO COORDINADOR(dniCoor, nombreCoor, apellidoCoor) VALUES(4444, "Mateo", "Herrero");
INSERT INTO COORDINADOR(dniCoor, nombreCoor, apellidoCoor) VALUES(5555, "Iker", "Jimenez");

INSERT INTO COORDINADOR(dniCoor, nombreCoor, apellidoCoor) VALUES(7777, "Irene", "Sierra");
INSERT INTO COORDINADOR(dniCoor, nombreCoor, apellidoCoor) VALUES(8888, "Judith", "Losada");
INSERT INTO COORDINADOR(dniCoor, nombreCoor, apellidoCoor) VALUES(9999, "Marco", "Polo");
INSERT INTO COORDINADOR(dniCoor, nombreCoor, apellidoCoor) VALUES(1212, "Luisa", "Alonso");

INSERT INTO ASIGNATURA(idAsig, idCarr, dniCoor, nombreAsig, creditos, tipo) VALUES (1, 1, 1234, "Seguridad", 6, "obligatoria");
INSERT INTO ASIGNATURA(idAsig, idCarr, dniCoor, nombreAsig, creditos, tipo) VALUES (2, 1, 2345, "FI", 6, "obligatoria");
INSERT INTO ASIGNATURA(idAsig, idCarr, dniCoor, nombreAsig, creditos, tipo) VALUES (3, 1, 3456, "Videojuegos", 6, "optativa");
INSERT INTO ASIGNATURA(idAsig, idCarr, dniCoor, nombreAsig, creditos, tipo) VALUES (4, 1, 4567, "Robots", 6, "optativa");
INSERT INTO ASIGNATURA(idAsig, idCarr, dniCoor, nombreAsig, creditos, tipo) VALUES (5, 1, 3456, "Álgebra", 6, "obligatoria");

INSERT INTO ASIGNATURA(idAsig, idCarr, dniCoor, nombreAsig, creditos, tipo) VALUES (6, 2, 2134, "Estadistica", 6, "obligatoria");
INSERT INTO ASIGNATURA(idAsig, idCarr, dniCoor, nombreAsig, creditos, tipo) VALUES (7, 2, 3412, "Econometria", 6, "obligatoria");
INSERT INTO ASIGNATURA(idAsig, idCarr, dniCoor, nombreAsig, creditos, tipo) VALUES (8, 2, 4321, "Informatica", 6, "optativa");
INSERT INTO ASIGNATURA(idAsig, idCarr, dniCoor, nombreAsig, creditos, tipo) VALUES (9, 2, 2134, "Empresa", 6, "optativa");
INSERT INTO ASIGNATURA(idAsig, idCarr, dniCoor, nombreAsig, creditos, tipo) VALUES (10, 2, 4312, "Contabilidad", 6, "obligatoria");

INSERT INTO ASIGNATURA(idAsig, idCarr, dniCoor, nombreAsig, creditos, tipo) VALUES (11, 3, 2222, "Empresa", 6, "obligatoria");
INSERT INTO ASIGNATURA(idAsig, idCarr, dniCoor, nombreAsig, creditos, tipo) VALUES (12, 3, 3333, "IR", 6, "obligatoria");
INSERT INTO ASIGNATURA(idAsig, idCarr, dniCoor, nombreAsig, creditos, tipo) VALUES (13, 3, 4444, "Sistemas", 6, "optativa");
INSERT INTO ASIGNATURA(idAsig, idCarr, dniCoor, nombreAsig, creditos, tipo) VALUES (14, 3, 3333, "Estadistica", 6, "optativa");
INSERT INTO ASIGNATURA(idAsig, idCarr, dniCoor, nombreAsig, creditos, tipo) VALUES (15, 3, 5555, "Derecho", 6, "obligatoria");

INSERT INTO ASIGNATURA(idAsig, idCarr, dniCoor, nombreAsig, creditos, tipo) VALUES (16, 4, 7777, "Educacion", 6, "obligatoria");
INSERT INTO ASIGNATURA(idAsig, idCarr, dniCoor, nombreAsig, creditos, tipo) VALUES (17, 4, 9999, "Infantil", 6, "obligatoria");
INSERT INTO ASIGNATURA(idAsig, idCarr, dniCoor, nombreAsig, creditos, tipo) VALUES (18, 4, 8888, "Gimnasia", 6, "optativa");
INSERT INTO ASIGNATURA(idAsig, idCarr, dniCoor, nombreAsig, creditos, tipo) VALUES (19, 4, 1212, "Plastica", 6, "optativa");
INSERT INTO ASIGNATURA(idAsig, idCarr, dniCoor, nombreAsig, creditos, tipo) VALUES (20, 4, 7777, "Musica", 6, "obligatoria");

INSERT INTO PROFESOR(dniProf, nombreProf, apellidoProf, domicilioProf) VALUES (123, "Luis", "Sierra", "Oviedo");
INSERT INTO PROFESOR(dniProf, nombreProf, apellidoProf, domicilioProf) VALUES (234, "Ramon", "Garcia", "Madrid");
INSERT INTO PROFESOR(dniProf, nombreProf, apellidoProf, domicilioProf) VALUES (345, "Ibai", "Llanos", "Bilbao");
INSERT INTO PROFESOR(dniProf, nombreProf, apellidoProf, domicilioProf) VALUES (456, "Cristina", "Gomez", "Leon");
INSERT INTO PROFESOR(dniProf, nombreProf, apellidoProf, domicilioProf) VALUES (567, "Manuel", "Rodriguez", "Vigo");

INSERT INTO PROFESOR(dniProf, nombreProf, apellidoProf, domicilioProf) VALUES (321, "Aitor", "Rodriguez", "Oviedo");
INSERT INTO PROFESOR(dniProf, nombreProf, apellidoProf, domicilioProf) VALUES (432, "Aroa", "Menendez", "Madrid");
INSERT INTO PROFESOR(dniProf, nombreProf, apellidoProf, domicilioProf) VALUES (543, "Vanesa", "Ramos", "Bilbao");
INSERT INTO PROFESOR(dniProf, nombreProf, apellidoProf, domicilioProf) VALUES (654, "Laura", "Begega", "Leon");
INSERT INTO PROFESOR(dniProf, nombreProf, apellidoProf, domicilioProf) VALUES (765, "Ignacio", "Prado", "Vigo");

INSERT INTO PROFESOR(dniProf, nombreProf, apellidoProf, domicilioProf) VALUES (121, "Alba", "Prado", "Oviedo");
INSERT INTO PROFESOR(dniProf, nombreProf, apellidoProf, domicilioProf) VALUES (232, "Silvino", "Huerta", "Madrid");
INSERT INTO PROFESOR(dniProf, nombreProf, apellidoProf, domicilioProf) VALUES (343, "Beatriz", "Gonzalez", "Bilbao");
INSERT INTO PROFESOR(dniProf, nombreProf, apellidoProf, domicilioProf) VALUES (454, "Daniel", "Cabo", "Leon");
INSERT INTO PROFESOR(dniProf, nombreProf, apellidoProf, domicilioProf) VALUES (565, "Javier", "Martinez", "Vigo");

INSERT INTO PROFESOR(dniProf, nombreProf, apellidoProf, domicilioProf) VALUES (989, "Ismael", "Perez", "Oviedo");
INSERT INTO PROFESOR(dniProf, nombreProf, apellidoProf, domicilioProf) VALUES (878, "Adriana", "Gomez", "Madrid");
INSERT INTO PROFESOR(dniProf, nombreProf, apellidoProf, domicilioProf) VALUES (767, "Monica", "Gutierrez", "Bilbao");
INSERT INTO PROFESOR(dniProf, nombreProf, apellidoProf, domicilioProf) VALUES (656, "Juan", "Alvarez", "Leon");
INSERT INTO PROFESOR(dniProf, nombreProf, apellidoProf, domicilioProf) VALUES (545, "Antonio", "Perez", "Vigo");

INSERT INTO IMPARTE(idAsig, dniProf) VALUES(1, 123);
INSERT INTO IMPARTE(idAsig, dniProf) VALUES(1, 234);
INSERT INTO IMPARTE(idAsig, dniProf) VALUES(2, 345);
INSERT INTO IMPARTE(idAsig, dniProf) VALUES(2, 456);
INSERT INTO IMPARTE(idAsig, dniProf) VALUES(3, 123);
INSERT INTO IMPARTE(idAsig, dniProf) VALUES(3, 345);
INSERT INTO IMPARTE(idAsig, dniProf) VALUES(4, 234);
INSERT INTO IMPARTE(idAsig, dniProf) VALUES(4, 456);
INSERT INTO IMPARTE(idAsig, dniProf) VALUES(5, 234);
INSERT INTO IMPARTE(idAsig, dniProf) VALUES(5, 567);

INSERT INTO IMPARTE(idAsig, dniProf) VALUES(6, 321);
INSERT INTO IMPARTE(idAsig, dniProf) VALUES(6, 432);
INSERT INTO IMPARTE(idAsig, dniProf) VALUES(7, 543);
INSERT INTO IMPARTE(idAsig, dniProf) VALUES(7, 654);
INSERT INTO IMPARTE(idAsig, dniProf) VALUES(8, 321);
INSERT INTO IMPARTE(idAsig, dniProf) VALUES(8, 543);
INSERT INTO IMPARTE(idAsig, dniProf) VALUES(9, 432);
INSERT INTO IMPARTE(idAsig, dniProf) VALUES(9, 654);
INSERT INTO IMPARTE(idAsig, dniProf) VALUES(10, 432);
INSERT INTO IMPARTE(idAsig, dniProf) VALUES(10, 765);

INSERT INTO IMPARTE(idAsig, dniProf) VALUES(11, 121);
INSERT INTO IMPARTE(idAsig, dniProf) VALUES(11, 232);
INSERT INTO IMPARTE(idAsig, dniProf) VALUES(12, 343);
INSERT INTO IMPARTE(idAsig, dniProf) VALUES(12, 454);
INSERT INTO IMPARTE(idAsig, dniProf) VALUES(13, 121);
INSERT INTO IMPARTE(idAsig, dniProf) VALUES(13, 343);
INSERT INTO IMPARTE(idAsig, dniProf) VALUES(14, 232);
INSERT INTO IMPARTE(idAsig, dniProf) VALUES(14, 454);
INSERT INTO IMPARTE(idAsig, dniProf) VALUES(15, 232);
INSERT INTO IMPARTE(idAsig, dniProf) VALUES(15, 565);

INSERT INTO IMPARTE(idAsig, dniProf) VALUES(16, 989);
INSERT INTO IMPARTE(idAsig, dniProf) VALUES(16, 878);
INSERT INTO IMPARTE(idAsig, dniProf) VALUES(17, 767);
INSERT INTO IMPARTE(idAsig, dniProf) VALUES(17, 656);
INSERT INTO IMPARTE(idAsig, dniProf) VALUES(18, 989);
INSERT INTO IMPARTE(idAsig, dniProf) VALUES(18, 767);
INSERT INTO IMPARTE(idAsig, dniProf) VALUES(19, 878);
INSERT INTO IMPARTE(idAsig, dniProf) VALUES(19, 656);
INSERT INTO IMPARTE(idAsig, dniProf) VALUES(20, 878);
INSERT INTO IMPARTE(idAsig, dniProf) VALUES(20, 545);

INSERT INTO ALUMNO(dniAlum, nombreAlum, apellidoAlum,  domicilioAlum) VALUES (098, "Miriam", "Gonzalez", "Oviedo");
INSERT INTO ALUMNO(dniAlum, nombreAlum, apellidoAlum,  domicilioAlum) VALUES (078, "Ruben", "Sierra", "Villablino");
INSERT INTO ALUMNO(dniAlum, nombreAlum, apellidoAlum,  domicilioAlum) VALUES (789, "Ana", "Fernandez", "Langreo");
INSERT INTO ALUMNO(dniAlum, nombreAlum, apellidoAlum,  domicilioAlum) VALUES (675, "Sonia", "Suarez", "Laviana");
INSERT INTO ALUMNO(dniAlum, nombreAlum, apellidoAlum,  domicilioAlum) VALUES (978, "Sergio", "Gil", "Ponferrada");

INSERT INTO ALUMNO(dniAlum, nombreAlum, apellidoAlum,  domicilioAlum) VALUES (111, "Raul", "Prieto", "Oviedo");
INSERT INTO ALUMNO(dniAlum, nombreAlum, apellidoAlum,  domicilioAlum) VALUES (222, "Andres", "Pinheiro", "Villablino");
INSERT INTO ALUMNO(dniAlum, nombreAlum, apellidoAlum,  domicilioAlum) VALUES (333, "Jonathan", "Aller", "Langreo");
INSERT INTO ALUMNO(dniAlum, nombreAlum, apellidoAlum,  domicilioAlum) VALUES (444, "Paula", "Martin", "Laviana");
INSERT INTO ALUMNO(dniAlum, nombreAlum, apellidoAlum,  domicilioAlum) VALUES (555, "Jon", "Escalada", "Ponferrada");

INSERT INTO ALUMNO(dniAlum, nombreAlum, apellidoAlum,  domicilioAlum) VALUES (666, "Aurora", "Gabela", "Oviedo");
INSERT INTO ALUMNO(dniAlum, nombreAlum, apellidoAlum,  domicilioAlum) VALUES (777, "Joel", "Sanchez", "Villablino");
INSERT INTO ALUMNO(dniAlum, nombreAlum, apellidoAlum,  domicilioAlum) VALUES (888, "Argentina", "Ruiz", "Langreo");
INSERT INTO ALUMNO(dniAlum, nombreAlum, apellidoAlum,  domicilioAlum) VALUES (999, "Frank", "Diaz", "Laviana");
INSERT INTO ALUMNO(dniAlum, nombreAlum, apellidoAlum,  domicilioAlum) VALUES (242, "Antonio", "Molina", "Ponferrada");

INSERT INTO ALUMNO(dniAlum, nombreAlum, apellidoAlum,  domicilioAlum) VALUES (353, "Fernando", "Torres", "Oviedo");
INSERT INTO ALUMNO(dniAlum, nombreAlum, apellidoAlum,  domicilioAlum) VALUES (464, "Jose", "Serrano", "Villablino");
INSERT INTO ALUMNO(dniAlum, nombreAlum, apellidoAlum,  domicilioAlum) VALUES (575, "Paula", "Alvarez", "Langreo");
INSERT INTO ALUMNO(dniAlum, nombreAlum, apellidoAlum,  domicilioAlum) VALUES (686, "Oscar", "Romero", "Laviana");
INSERT INTO ALUMNO(dniAlum, nombreAlum, apellidoAlum,  domicilioAlum) VALUES (797, "Ramon", "Rodriguez", "Ponferrada");

INSERT INTO CURSA(idAsig, dniAlum) VALUES(1, 098);
INSERT INTO CURSA(idAsig, dniAlum) VALUES(2, 098);
INSERT INTO CURSA(idAsig, dniAlum) VALUES(5, 098);
INSERT INTO CURSA(idAsig, dniAlum) VALUES(3, 078);
INSERT INTO CURSA(idAsig, dniAlum) VALUES(4, 078);
INSERT INTO CURSA(idAsig, dniAlum) VALUES(5, 078);
INSERT INTO CURSA(idAsig, dniAlum) VALUES(1, 789);
INSERT INTO CURSA(idAsig, dniAlum) VALUES(2, 789);
INSERT INTO CURSA(idAsig, dniAlum) VALUES(1, 675);
INSERT INTO CURSA(idAsig, dniAlum) VALUES(4, 675);
INSERT INTO CURSA(idAsig, dniAlum) VALUES(5, 675);
INSERT INTO CURSA(idAsig, dniAlum) VALUES(2, 978);
INSERT INTO CURSA(idAsig, dniAlum) VALUES(4, 978);
INSERT INTO CURSA(idAsig, dniAlum) VALUES(5, 978);

INSERT INTO CURSA(idAsig, dniAlum) VALUES(6, 111);
INSERT INTO CURSA(idAsig, dniAlum) VALUES(7, 111);
INSERT INTO CURSA(idAsig, dniAlum) VALUES(10, 111);
INSERT INTO CURSA(idAsig, dniAlum) VALUES(8, 222);
INSERT INTO CURSA(idAsig, dniAlum) VALUES(9, 222);
INSERT INTO CURSA(idAsig, dniAlum) VALUES(10, 222);
INSERT INTO CURSA(idAsig, dniAlum) VALUES(6, 333);
INSERT INTO CURSA(idAsig, dniAlum) VALUES(7, 333);
INSERT INTO CURSA(idAsig, dniAlum) VALUES(6, 444);
INSERT INTO CURSA(idAsig, dniAlum) VALUES(9, 444);
INSERT INTO CURSA(idAsig, dniAlum) VALUES(10, 444);
INSERT INTO CURSA(idAsig, dniAlum) VALUES(7, 555);
INSERT INTO CURSA(idAsig, dniAlum) VALUES(9, 555);
INSERT INTO CURSA(idAsig, dniAlum) VALUES(8, 555);

INSERT INTO CURSA(idAsig, dniAlum) VALUES(11, 666);
INSERT INTO CURSA(idAsig, dniAlum) VALUES(12, 666);
INSERT INTO CURSA(idAsig, dniAlum) VALUES(15, 666);
INSERT INTO CURSA(idAsig, dniAlum) VALUES(13, 777);
INSERT INTO CURSA(idAsig, dniAlum) VALUES(14, 777);
INSERT INTO CURSA(idAsig, dniAlum) VALUES(15, 777);
INSERT INTO CURSA(idAsig, dniAlum) VALUES(11, 888);
INSERT INTO CURSA(idAsig, dniAlum) VALUES(12, 888);
INSERT INTO CURSA(idAsig, dniAlum) VALUES(11, 999);
INSERT INTO CURSA(idAsig, dniAlum) VALUES(14, 999);
INSERT INTO CURSA(idAsig, dniAlum) VALUES(15, 999);
INSERT INTO CURSA(idAsig, dniAlum) VALUES(12, 242);
INSERT INTO CURSA(idAsig, dniAlum) VALUES(14, 242);
INSERT INTO CURSA(idAsig, dniAlum) VALUES(15, 242);

INSERT INTO CURSA(idAsig, dniAlum) VALUES(16, 353);
INSERT INTO CURSA(idAsig, dniAlum) VALUES(17, 353);
INSERT INTO CURSA(idAsig, dniAlum) VALUES(20, 353);
INSERT INTO CURSA(idAsig, dniAlum) VALUES(18, 464);
INSERT INTO CURSA(idAsig, dniAlum) VALUES(19, 464);
INSERT INTO CURSA(idAsig, dniAlum) VALUES(20, 464);
INSERT INTO CURSA(idAsig, dniAlum) VALUES(16, 575);
INSERT INTO CURSA(idAsig, dniAlum) VALUES(17, 575);
INSERT INTO CURSA(idAsig, dniAlum) VALUES(16, 686);
INSERT INTO CURSA(idAsig, dniAlum) VALUES(19, 686);
INSERT INTO CURSA(idAsig, dniAlum) VALUES(20, 686);
INSERT INTO CURSA(idAsig, dniAlum) VALUES(17, 797);
INSERT INTO CURSA(idAsig, dniAlum) VALUES(19, 797);
INSERT INTO CURSA(idAsig, dniAlum) VALUES(20, 797);