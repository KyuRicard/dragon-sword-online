package com.kyuricard.display;

import static org.lwjgl.glfw.GLFW.*;
import static org.lwjgl.glfw.Callbacks.*;
import static org.lwjgl.opengl.GL11.*;
import static org.lwjgl.system.MemoryUtil.*;

import org.lwjgl.glfw.*;
import org.lwjgl.opengl.*;

public class Display {
	private long window;
	private GLFWErrorCallback errorCallback;
	private GLFWKeyCallback keyCallback;
	
	public Display() {
		try {
			init();
			loop();
		} finally {
			glfwTerminate();
			errorCallback.release();
		}		
	}
	
	private void init() {
		glfwSetErrorCallback(errorCallback = errorCallbackPrint(System.err));
		if (glfwInit() != GL_TRUE) {
			throw new IllegalStateException("No s'ha pogut inicialitzar GLFW");
		}
		
		glfwDefaultWindowHints();
		glfwWindowHint(GLFW_VISIBLE, GL_FALSE);
		glfwWindowHint(GLFW_RESIZABLE, GL_FALSE);
		
		window = glfwCreateWindow(1280, 720, "Dragon Sword Online", NULL, NULL);
		
		glfwMakeContextCurrent(window);
		glfwSwapInterval(1);
		glfwShowWindow(window);
	}
	
	private void loop() {
		GLContext.createFromCurrent();
		glClearColor(1, 0, 0, 1);
		while (glfwWindowShouldClose(window) == GL_FALSE) {
			glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
			glfwSwapBuffers(window);
			glfwPollEvents();
		}
	}
}
