<h1 align="center">Simple beam modeling</h1>
<div  align="center">
<img align="center" src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Simple_beam_with_center_load.svg"  />
</div>

## Theory

This model is based on classical Solid Mechanics and Strenght of Materials results to solve the beam equilibirum problem. A simple outline follows in the present section, without entering in any mathematical derivations.

- **Reaction computation** - This model does not allow axial loads, currently. Therefore, depending on the support type, one shall need to compute a either a transverse reaction force or a reaction moment. These are computed by solving the algebraic system of linear equations arising from the equilibirum of forces and moments of the structure, accounting simultaneously for point loads and moments and distributed forces.

$$
\sum F_y = 0 \qquad \sum M_O = 0
$$

- **Bending diagrams** - the shear force and bending moment diagrams are computed by integrating the differential equations of equilibirum of the beam and imposing the boundary conditions in a sequential manner, starting from the initial point at `x0`. The expressions obtained at the previous segment are used to set the boundary conditions for the next one.

<p align="center">
$$
\frac{\\text{d}V}{\text{d}x} = -q(x) \qquad \frac{\text{d}M}{\text{d}x} = -V(x)
$$
</p>

- **Deflection** - the slope and deflection of the beam are obtained by integration the elastic curve equation in each segment one and two times, respectively. The geometrical boundary conditions are used to build a system of algebraic equations for the integration constants (twice the number of segments).

<p align="center">
$$
\frac{\text{d}^2v}{\text{d}x^2} = \frac{M}{EI}
$$
</p>
