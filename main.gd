extends Node2D

var main_menu_scene = preload("res://main_menu.tscn").instantiate()

# Experimenting with changing scenes
func _ready():
	print("_ready() hit in Main.gd")
	get_tree().root.add_child.call_deferred(main_menu_scene)
