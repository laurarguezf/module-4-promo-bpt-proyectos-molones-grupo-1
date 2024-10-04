-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema freedb_proyectos_molones
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema freedb_proyectos_molones
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `freedb_proyectos_molones` DEFAULT CHARACTER SET utf8 ;
USE `freedb_proyectos_molones` ;

-- -----------------------------------------------------
-- Table `freedb_proyectos_molones`.`Author`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `freedb_proyectos_molones`.`Author` (
  `idAuthor` INT NOT NULL AUTO_INCREMENT,
  `author_name` VARCHAR(255) NOT NULL,
  `author_job` VARCHAR(45) NOT NULL,
  `author_photo` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`idAuthor`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `freedb_proyectos_molones`.`project`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `freedb_proyectos_molones`.`project` (
  `idproject` INT NOT NULL AUTO_INCREMENT,
  `project_name` VARCHAR(255) NOT NULL,
  `project_slogan` VARCHAR(255) NOT NULL,
  `project_repo` VARCHAR(255) NOT NULL,
  `project_demo` VARCHAR(255) NOT NULL,
  `project_ technologies` VARCHAR(255) NOT NULL,
  `project_description` VARCHAR(455) NOT NULL,
  `project_image` VARCHAR(255) NOT NULL,
  `Author_idAuthor` INT NOT NULL,
  PRIMARY KEY (`idproject`, `Author_idAuthor`),
  CONSTRAINT `fk_project_Author`
    FOREIGN KEY (`Author_idAuthor`)
    REFERENCES `freedb_proyectos_molones`.`Author` (`idAuthor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
