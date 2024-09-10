-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `permission` INTEGER NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `avatar` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Users_email_key`(`email`),
    UNIQUE INDEX `Users_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `belong_to` INTEGER NOT NULL,
    `title` VARCHAR(256) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `note` VARCHAR(5012) NOT NULL,
    `deep_note` VARCHAR(5012) NOT NULL,
    `between` VARCHAR(256) NOT NULL,
    `public` BOOLEAN NOT NULL,
    `book_name` VARCHAR(256) NOT NULL,

    UNIQUE INDEX `Notes_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
