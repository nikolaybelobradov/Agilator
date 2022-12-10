using Microsoft.EntityFrameworkCore.Migrations;

namespace Agilator.Data.Migrations
{
    public partial class AddProjectForeignKeyToSprints : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TeamMembers_Sprints_SprintId",
                table: "TeamMembers");

            migrationBuilder.DropIndex(
                name: "IX_TeamMembers_SprintId",
                table: "TeamMembers");

            migrationBuilder.DropColumn(
                name: "SprintId",
                table: "TeamMembers");

            migrationBuilder.AlterColumn<string>(
                name: "ProjectId",
                table: "Sprints",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SprintId",
                table: "TeamMembers",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ProjectId",
                table: "Sprints",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.CreateIndex(
                name: "IX_TeamMembers_SprintId",
                table: "TeamMembers",
                column: "SprintId");

            migrationBuilder.AddForeignKey(
                name: "FK_TeamMembers_Sprints_SprintId",
                table: "TeamMembers",
                column: "SprintId",
                principalTable: "Sprints",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
