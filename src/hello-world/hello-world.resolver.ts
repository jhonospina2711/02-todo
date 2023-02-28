import { Float, Query, Resolver, Int, Args } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {
  @Query(() => String, {
    description: 'Hola Mundo es lo que retorna',
    name: 'hello',
  })
  hello(): string {
    return 'Hola Mundo';
  }

  @Query(() => Float, { name: 'randomNumber' })
  getRandomNumber(): number {
    return Math.random() * 100;
  }

  // randomFromZeroTo
  @Query( () => Int, { name: 'randomFromZeroTo', description: 'From zero to argument TO (defaul 6)'})
  getRandomFromZeroTo( 
    @Args('to', { nullable: true, type: () => Int }) to: number = 6 ): number {
      return Math.floor(Math.random() * to);
  }
}
