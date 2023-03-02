package com.israelsoares.crudspring.exception;

public class RecordNotFoundException extends RuntimeException{

    public static final long serialUniversalUID = 1L;

    //TODO Adicionar errorMSG customized
    public RecordNotFoundException(Long id){
        super("Registro não encontrado com o id " + id);
    }
}
