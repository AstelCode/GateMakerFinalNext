export interface Persistable<T> {
  toPersistance(): T;
}
