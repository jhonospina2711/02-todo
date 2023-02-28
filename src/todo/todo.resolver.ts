import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';
import { UpdateTodoInput, CreateTodoInput, StatusArgs } from './dto';
import { AggregationsType } from './dto/types/aggregations.type';

@Resolver( () => Todo )
export class TodoResolver {

    constructor(
        private readonly todoService: TodoService
    ) {}

  @Query(() => [Todo], { name: 'todos' })
  findAll(
    //! Tarea: Args //statusArgs
    @Args() statusArgs: StatusArgs ): Todo[] {
    return this.todoService.findAll( statusArgs);
  }

  @Query( () => Todo, { name: 'todo'} ) 
  findOne( 
    @Args('id', {  type: () => Int}) id: number): Todo {
    return this.todoService.findOne( id );
  }

  @Mutation( () => Todo, { name: 'createTodoInput' })
  createTodo(
    @Args('createTodoInput') createTodoInput: CreateTodoInput
  ) {

    return this.todoService.create( createTodoInput );
  }

@Mutation( () => Todo, {name: 'UpdateTodoInput'})
  updateTodo(
    @Args('updateTodoInput') updateTodoInput: UpdateTodoInput
  ) {
    return this.todoService.update( updateTodoInput.id, updateTodoInput );
  }

  @Mutation( () => Boolean, { name: 'DeleteTodoInput'})
  removeTodo(
    @Args('id', { type: () => Int }) id: number
  ) {
    return this.todoService.delete( id );
  }

  @Query( () => Int, {name: 'totalTodos'} )
  totalTodos(): number {
    return this.todoService.totalTodos;
  }

  @Query( () => Int, {name: 'completedTodos'})
  completedTodos(): number {
    return this.todoService.completedTodos;
  }

  @Query( () => Int, {name: 'pendingTodos'})
  pendingTodos(): number {
    return this.todoService.pendingTodos;
  }

  //! Agrupado
  @Query( () => AggregationsType )
  aggregations(): AggregationsType {
    return {
      completed: this.todoService.completedTodos,
      pending: this.todoService.pendingTodos,
      total: this.todoService.totalTodos,
      totalTodosCompleted: this.todoService.totalTodos,
    }
  } 
}
