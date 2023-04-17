import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)
      private readonly pokemonModel: Model<Pokemon>
    ) {

    }

  async create(createPokemonDto: CreatePokemonDto) {
    try{

      createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
      const pokemon = await this.pokemonModel.create( createPokemonDto );
      return pokemon;
    
    }catch(error){

      this.handleExceptions(error);

    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string) {
    let pokemon: Pokemon;
    if(!isNaN(+term)){
      pokemon = await this.pokemonModel.findOne({ no: term });
    }

    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }

    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase().trim() });
    }

    if (!pokemon) 
      throw new NotFoundException('Pokemon not found.');

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    try{
      let pokemon = this.findOne(term);

      if (updatePokemonDto.name) 
        updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
      
      const result = await (await pokemon).updateOne(updatePokemonDto);
      return result;
    }catch(error){
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    // const pokemon = await this.findOne(id);
    // await pokemon.deleteOne();
    // const result = await this.pokemonModel.findByIdAndDelete(id);
    const {deletedCount} = await this.pokemonModel.deleteOne({ _id: id });

    if(deletedCount === 0)
      throw new NotFoundException(`Pokemon with id ${id} not found.`);

    return { deleted: true };
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException('Pokemon already exists. Detail: ' + JSON.stringify(error.keyValue));
    }
    console.log(error);
    throw new InternalServerErrorException('Internal Server Error, check server logs for more details.');
  }
}
