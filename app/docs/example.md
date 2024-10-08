
---
id: camera3d
title: Camera3D in Godot
sidebar_label: Camera3D
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Camera3D in Godot

`Camera3D` in Godot is used to display the scene from a particular point of view. It is essential for any 3D project, and this guide will show you how to set up a `Camera3D` and implement basic movement controls using both **GDScript** and **C#**.

## Table of Contents
- [Camera3D in Godot](#camera3d-in-godot)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Basic Setup](#basic-setup)
  - [Line Highlighting](#line-highlighting)
  - [Movement and Control](#movement-and-control)

## Overview

`Camera3D` allows you to render what it sees in 3D space. You can create a first-person or third-person camera for games, simulations, or any 3D application. Below is a complex example that involves not only setting up the camera but also managing player input and moving the camera in 3D space.

:::note
This guide assumes basic familiarity with Godot's Node system and 3D project setup. If you're new, check out the [Godot Official Docs](https://docs.godotengine.org/en/stable/) for an introduction.
:::

## Basic Setup

<Tabs>
<TabItem value="gdscript" label="GDScript">

```gdscript title="camera.gd"
extends Camera3D

func _ready():
    # Make this the active camera for the viewport
    current = true
```

</TabItem>
<TabItem value="csharp" label="C#">

```csharp title="camera.cs"
using Godot;
public class Camera : Camera3D
{
    public override void _Ready()
    {
        // Set this as the active camera
        Current = true;
    }
}
```

</TabItem>
</Tabs>

## Line Highlighting

In the above examples, notice how the line that makes the camera active is key to the setup. To highlight lines in Docusaurus, you can use the following syntax:

```gdscript {3} title="Highlighting Active Line in camera.gd"
extends Camera3D

func _ready():
    # Make this the active camera for the viewport
    current = true
```

## Movement and Control

Next, we'll add basic player controls to move the camera using WASD keys and mouse look. This will demonstrate how to control camera movement with player input.

<Tabs>
<TabItem value="gdscript" label="GDScript">

```gdscript title="camera_movement.gd"
extends Camera3D

var speed := 5
var mouse_sensitivity := 0.1
var rotation := Vector3.ZERO

func _process(delta):
    var direction := Vector3.ZERO

    if Input.is_action_pressed("move_forward"):
        direction -= transform.basis.z
    if Input.is_action_pressed("move_backward"):
        direction += transform.basis.z
    if Input.is_action_pressed("move_left"):
        direction -= transform.basis.x
    if Input.is_action_pressed("move_right"):
        direction += transform.basis.x

    direction = direction.normalized() * speed * delta
    translation += direction

func _input(event):
    if event is InputEventMouseMotion:
        rotation.y -= event.relative.x * mouse_sensitivity
        rotation.x -= event.relative.y * mouse_sensitivity
        rotation.x = clamp(rotation.x, deg2rad(-90), deg2rad(90))
        rotation_degrees = Vector3(rotation.x, rotation.y, 0)
```

</TabItem>
<TabItem value="csharp" label="C#">

```csharp title="camera_movement.cs"
using Godot;

public class CameraMovement : Camera3D
{
    private float speed = 5f;
    private float mouseSensitivity = 0.1f;
    private Vector3 rotation = Vector3.Zero;

    public override void _Process(float delta)
    {
        Vector3 direction = Vector3.Zero;

        if (Input.IsActionPressed("move_forward"))
            direction -= Transform.basis.z;
        if (Input.IsActionPressed("move_backward"))
            direction += Transform.basis.z;
        if (Input.IsActionPressed("move_left"))
            direction -= Transform.basis.x;
        if (Input.IsActionPressed("move_right"))
            direction += Transform.basis.x;

        direction = direction.Normalized() * speed * delta;
        Translation += direction;
    }

    public override void _Input(InputEvent @event)
    {
        if (@event is InputEventMouseMotion motionEvent)
        {
            rotation.y -= motionEvent.Relative.x * mouseSensitivity;
            rotation.x -= motionEvent.Relative.y * mouseSensitivity;
            rotation.x = Mathf.Clamp(rotation.x, Mathf.DegToRad(-90), Mathf.DegToRad(90));
            RotationDegrees = new Vector3(rotation.x, rotation.y, 0);
        }
    }
}
```

</TabItem>
</Tabs>
