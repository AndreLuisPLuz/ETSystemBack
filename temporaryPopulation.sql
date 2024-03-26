INSERT INTO institution
(name, isBosch, createdAt, updatedAt, deletedAt)
VALUES
(
	'Master Bosch',
	1,
	GETDATE(),
	GETDATE(),
	NULL
);

INSERT INTO person
(username, password, name, email, dateOfBirth, contact, createdAt, updatedAt, deletedAt, institutionIdInstitution)
VALUES
(
	'Master',
	'$2a$10$i1Qx0X5SRcpKKNC8GUOZOuLEeTrmEYSB8WWpK.YjHxjMZzKm44pR2',
	'Mister Master',
	'master@mail.com',
	GETDATE(),
	'(12)34567-8910',
	GETDATE(),
	GETDATE(),
	NULL,
	(SELECT TOP 1 idInstitution FROM institution)
);

INSERT INTO administrator
(isMaster, createdAt, updatedAt, deletedAt, userIdUser)
VALUES
(
	1,
	GETDATE(),
	GETDATE(),
	NULL,
	(SELECT TOP 1 idUser FROM person)
);