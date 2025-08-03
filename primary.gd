extends Node2D


func _quit_pressed() -> void:
	print("Exit button pressed in primary")
	get_tree().quit()
