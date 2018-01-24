package MathProgParser;

public class Param {

	public static final int SET=0;
	public static final int INTEGER=1;
	public static final int MATRIX=2;
	public static final int BINARY=3;
	public static final int FLOAT=4;
	public static final int DOUBLE=5;
	
	public String name;
	
	public int type;

	public Param(String name, int type) {
		super();
		this.name = name;
		this.type = type;
	}
	
	
	
}
