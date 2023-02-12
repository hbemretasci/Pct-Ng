export abstract class Mapper<I, O> {
    abstract mapTo(param: I): O;
}