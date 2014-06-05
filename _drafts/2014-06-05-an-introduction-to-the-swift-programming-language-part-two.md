---
layout: post
title: An Introduction to the Swift Programming Language - Part Two
summary: This is the second part of many that chronicle my exploration into Apple's new programming language, Swift. This post deals with Getters, Setters, and Inheritance.
category: Swift
---

## Getters and Setters

As discussed in Part One, properties defined in a class have inferred getters and setters. For example, consider the example `Duck` class:

```swift
class Duck {
  var noise = "quack"
  var color = "yellow"
  var currentLocation = "home"
  var priorLocations: String[]

  init() {
    self.priorLocations = []
  }

  func makeANoise() {
    println(noise)
  }
}

let myDuck = Duck()
```

Each instantiated `Duck` has a property `noise`. It can be retrieved with the inferred getter:

```swift
myDuck.noise // => "quack"
```

There's also a setter, assuming the property is mutable:

```swift
myDuck.noise = "gobble gobble"
myDuck.noise // => "gobble gobble"
```

## Inheritance

First, let's revisit the `Duck` class from the previous section.

```swift
class Duck {
  var noise = "quack"
  var color = "yellow"

  func makeANoise() {
    println("quack")
  }
}
```

Now, if we want to create a type of duck that inherits from the `Duck` base class, we have to add `: Duck` after the new class name. The syntax, in a nutshell, is `class ChildClass: ParentClass {}`. Also, it's important to note that swift only allows single inheritance.

```swift
class Mallard: Duck {
  var color = "green"

  override func makeANoise() {
    println("\(noise) \(noise)")
  }
}

myMallard = Mallard()
```

```swift
myMallard.color // => "green"
myMallard.makeANoise() // => "quack quack"
```
