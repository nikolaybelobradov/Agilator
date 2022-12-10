using Microsoft.EntityFrameworkCore.Migrations;

namespace Agilator.Data.Migrations
{
    public partial class FromFirstNameAndLastNameToNameInTeamMembersTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "TeamMembers");

            migrationBuilder.DropColumn(
                name: "LastName",
                table: "TeamMembers");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "TeamMembers",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "TeamMembers");

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "TeamMembers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "LastName",
                table: "TeamMembers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
