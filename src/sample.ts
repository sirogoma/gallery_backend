import 'reflect-metadata'
import { Container, Inject, Service } from 'typedi'

@Service()
class InjectedExampleClass {
  print() {
    console.log('I am alive!')
  }
}

@Service()
class ExampleClass {
  @Inject()
  withDecorator: InjectedExampleClass

  withoutDecorator: InjectedExampleClass
}

const instance = Container.get(ExampleClass)

/**
 * The `instance` variable is an ExampleClass instance with the `withDecorator`
 * property containing an InjectedExampleClass instance and `withoutDecorator`
 * property being undefined.
 */
console.log(instance)

instance.withDecorator.print()
// prints "I am alive!" (InjectedExampleClass.print function)
console.log(instance.withoutDecorator)
// logs undefined, as this property was not marked with an @Inject decorator
